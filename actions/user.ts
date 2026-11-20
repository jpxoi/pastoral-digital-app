'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUser } from '@/queries/insert'
import { z } from 'zod'
import { OnboardingFormSchema } from '@/schema'
import { checkPermission } from '@/lib/roles'
import { UserRole, UserSchedule } from '@/types'
import { getUserForRoleChange, getUserSchedule } from '@/queries/select'
import { SelectUser } from '@/db/schema'
import { updateUserSchedule } from '@/queries/update'
import { handleDbError } from '@/lib/error'
import { NeonDbError } from '@neondatabase/serverless'
import { cacheTags } from '@/lib/cache'
import { updateTag } from 'next/cache'
import { Permission } from '@/types/permissions'
import { updateUserRole } from '@/queries/update'

export const registerUser = async (
  values: z.infer<typeof OnboardingFormSchema>
) => {
  const { userId } = await auth()
  if (!userId) return { error: 'No se encontró el usuario autenticado.' }
  const validatedFields = OnboardingFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error:
        'Error al validar los campos. Por favor, verifica los datos ingresados',
    }
  }

  return await createUser({
    ...validatedFields.data,
    id: userId,
    dateOfBirth: validatedFields.data.dateOfBirth,
  })
    .then(async (savedUser) => {
      updateTag(cacheTags.usersList())
      const onboardingResult = await completeOnboarding(
        validatedFields.data.firstName,
        validatedFields.data.lastName,
        savedUser.role as UserRole
      )

      if (onboardingResult.error) {
        throw new Error(onboardingResult.error)
      }

      if (onboardingResult.success) {
        return { success: 'Usuario registrado exitosamente' }
      }

      return { error: 'Error al completar el registro del usuario' }
    })
    .catch((error) => {
      console.error(error)
      return { error: 'Error al registrar el usuario. Intenta nuevamente.' }
    })
}

const completeOnboarding = async (
  firstName: string,
  lastName: string,
  role: UserRole
) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: 'No se encontró el usuario autenticado.' }
  }

  const client = await clerkClient()

  try {
    await client.users.updateUser(userId, {
      publicMetadata: {
        role,
        onboardingComplete: true,
      },
      firstName,
      lastName,
    })

    return { success: 'Metadata del usuario actualizada exitosamente.' }
  } catch (err) {
    console.error(err)
    return { error: 'Hubo un error al actualizar los metadatos del usuario.' }
  }
}

export async function setUserSchedule(
  schedule: UserSchedule,
  userId: SelectUser['id']
) {
  if (!(await checkPermission(Permission.CATECHISTS_EDIT_PROGRAM))) {
    return { error: 'No estás autorizado para realizar esta acción.' }
  }

  return await updateUserSchedule(userId, schedule)
    .then(async () => {
      updateTag(cacheTags.usersList())

      return {
        success: 'Programa del catequista actualizado correctamente',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ocurrió un error al actualizar el programa del catequista.',
      }
    })
}

export async function setUserRole(userId: string, role: UserRole) {
  if (!(await checkPermission(Permission.CATECHISTS_ASSIGN_ROLE))) {
    return { error: 'Solo un administrador puede cambiar roles.' }
  }

  const assignableRoles = [
    UserRole.MEMBER,
    UserRole.SCANNER,
    UserRole.TEACHER,
    UserRole.COORDINATOR,
    UserRole.MANAGER,
    UserRole.ADMIN,
  ]

  if (!assignableRoles.includes(role)) {
    return { error: 'El rol seleccionado no es válido.' }
  }

  try {
    const dbUser = await getUserForRoleChange(userId)
    if (!dbUser) {
      return { error: 'No se encontró al catequista en la base de datos.' }
    }

    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const previousRole = user.publicMetadata.role ?? null
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    })

    try {
      const updatedUsers = await updateUserRole(userId, role)
      if (updatedUsers.length === 0) {
        throw new Error('No se encontró al catequista en la base de datos.')
      }
    } catch (error) {
      console.error('Failed to update user role in database:', {
        userId,
        role,
        error,
      })
      try {
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { role: previousRole },
        })
      } catch (rollbackError) {
        console.error('Failed to restore Clerk role after database failure:', {
          userId,
          previousRole,
          databaseRole: dbUser.role,
          requestedRole: role,
          rollbackError,
        })
        return {
          error:
            'No se pudo completar el cambio ni restaurar el rol anterior. Revisa el rol del catequista antes de reintentar.',
        }
      }
      return {
        error:
          'No se pudo guardar el cambio en la base de datos. Se restauró el rol anterior en Clerk.',
      }
    }
    updateTag(cacheTags.usersList())
    return { success: 'Rol del catequista actualizado correctamente.' }
  } catch (error) {
    console.error(error)
    return { error: 'No se pudo actualizar el rol del catequista.' }
  }
}

export async function fetchUserSchedule(userId: string) {
  if (!(await checkPermission(Permission.ATTENDANCE_SCAN))) {
    return { error: 'No estás autorizado para consultar el programa.' }
  }

  try {
    const user = await getUserSchedule(userId)

    if (!user) {
      return {
        error:
          'No se encontró al catequista en la base de datos. Por favor, verifica que esté registrado correctamente',
      }
    }

    if (!user.schedule) {
      return {
        error:
          'No se encontró el horario del catequista en la base de datos. Por favor, contacta al administrador',
      }
    }

    return {
      success: 'Horario del usuario obtenido correctamente',
      data: user.schedule,
    }
  } catch (err) {
    console.error(err)
    return {
      error:
        'Ocurrió un error inesperado al obtener el horario del catequista. Por favor, inténtalo nuevamente.',
    }
  }
}

export async function removeCatechist(targetUserId: string) {
  const { userId, sessionClaims } = await auth()
  if (!userId || sessionClaims?.metadata?.role !== UserRole.ADMIN) {
    return { error: 'Solo un administrador puede eliminar catequistas.' }
  }
  if (!targetUserId || targetUserId === userId) {
    return { error: 'No puedes eliminar tu propia cuenta.' }
  }
  try {
    const client = await clerkClient()
    try {
      await client.users.deleteUser(targetUserId)
    } catch (error) {
      if (!(
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        error.status === 404
      ))
        throw error
    }
    return {
      success:
        'Cuenta eliminada. La limpieza de sus datos se completará mediante el webhook.',
    }
  } catch (error) {
    console.error('Could not delete catechist', error)
    return {
      error:
        'No se pudo completar la eliminación. Intenta nuevamente para completar ambos sistemas.',
    }
  }
}
