'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUser } from '@/queries/insert'
import { z } from 'zod'
import { OnboardingFormSchema } from '@/schema'
import { checkPermission } from '@/lib/roles'
import { UserRole } from '@/types'
import { getUserForRoleChange } from '@/queries/select'
import { SelectUser } from '@/db/schema'
import { replaceUserAssignments } from '@/queries/assignments'
import { handleDbError } from '@/lib/error'
import { NeonDbError } from '@neondatabase/serverless'
import { cacheTags } from '@/lib/cache'
import { updateTag } from 'next/cache'
import { Permission } from '@/types/permissions'
import { updateUserRole } from '@/queries/update'
import { hasRolePermission } from '@/lib/permissions'

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

const assignmentsInputSchema = z
  .array(
    z
      .object({
        type: z.enum(['program', 'semillero', 'coordinator', 'logistics']),
        programId: z.uuid().nullable(),
        communityId: z.uuid().nullable(),
        responsibility: z.enum(['guide', 'advisor', 'semillero']).nullable(),
      })
      .strict()
  )
  .max(2)

export async function setUserAssignments(
  input: unknown,
  userId: SelectUser['id']
) {
  if (!(await checkPermission(Permission.CATECHISTS_EDIT_ASSIGNMENTS))) {
    return { error: 'No estás autorizado para realizar esta acción.' }
  }

  const parsed = assignmentsInputSchema.safeParse(input)
  if (!parsed.success) {
    return { error: 'Las asignaciones no son válidas.' }
  }

  return await replaceUserAssignments(userId, parsed.data)
    .then(async () => {
      updateTag(cacheTags.usersList())
      updateTag(cacheTags.assignments())
      updateTag(cacheTags.userAssignments(userId))

      return {
        success: 'Asignaciones del catequista actualizadas correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : error instanceof Error
              ? error.message
              : 'Ocurrió un error al actualizar las asignaciones.',
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
    UserRole.MASS_MANAGER,
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

export async function removeCatechist(targetUserId: string) {
  const { userId, sessionClaims } = await auth()
  if (
    !userId ||
    !hasRolePermission(
      sessionClaims?.metadata?.role,
      Permission.CATECHISTS_DELETE
    )
  ) {
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
