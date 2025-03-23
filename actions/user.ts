'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { createUser } from '@/queries/insert'
import { z } from 'zod'
import { OnboardingFormSchema } from '@/schema'

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

  return await createUser(validatedFields.data)
    .then(async () => {
      const onboardingResult = await completeOnboarding()

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

export const completeOnboarding = async () => {
  const { userId } = await auth()

  if (!userId) {
    return { error: 'No se pudo obtener el ID del usuario.' }
  }

  const currentUserRole = (await auth()).sessionClaims?.metadata.role

  const client = await clerkClient()

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        role: currentUserRole,
        onboardingComplete: true,
      },
    })

    return { success: 'Metadata del usuario actualizada exitosamente.' }
  } catch (err) {
    console.error(err)
    return { error: 'Hubo un error al actualizar los metadatos del usuario.' }
  }
}
