'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUser } from '@/queries/insert'
import { z } from 'zod'
import { OnboardingFormSchema } from '@/schema'
import { checkRole } from '@/lib/roles'
import { UserRole, UserSchedule } from '@/types'
import { getUserSchedule } from '@/queries/select'
import { SelectUser } from '@/db/schema'
import { updateUserSchedule } from '@/queries/update'
import { handleDbError } from '@/lib/error'
import { NeonDbError } from '@neondatabase/serverless'
import { updateTag } from 'next/cache'
import { formatISO } from 'date-fns'

export const registerUser = async (
  values: z.infer<typeof OnboardingFormSchema>
) => {
  const validatedFields = OnboardingFormSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error:
        'Error al validar los campos. Por favor, verifica los datos ingresados',
    }
  }

  return await createUser({
    ...validatedFields.data,
    dateOfBirth: formatISO(validatedFields.data.dateOfBirth),
  })
    .then(async () => {
      const onboardingResult = await completeOnboarding(
        validatedFields.data.firstName,
        validatedFields.data.lastName
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

const completeOnboarding = async (firstName: string, lastName: string) => {
  const { userId } = await auth()

  if (!userId) {
    return { error: 'No se encontró el usuario autenticado.' }
  }

  const client = await clerkClient()

  try {
    await client.users.updateUser(userId, {
      publicMetadata: {
        role: UserRole.MEMBER,
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
  // Check that the user trying to set the schedule is an admin
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estás autorizado para realizar esta acción.' }
  }

  return await updateUserSchedule(userId, schedule)
    .then(async () => {
      updateTag('users')

      return {
        success: 'Programa del catequista actualizado correctamente',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ocurrió un error al actualizar el programa del catequista.',
      }
    })
}

export async function fetchUserSchedule(userId: string) {
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
