'use server'

import { handleDbError } from '@/lib/error'
import { checkRole } from '@/lib/roles'
import { createSundayMass } from '@/queries/insert'
import { updateSundayMassRecordVerification } from '@/queries/update'
import { NewSundayMassFormSchema } from '@/schema'
import { UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NeonDbError } from '@neondatabase/serverless'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export async function postNewMassRecord(
  formValues: z.infer<typeof NewSundayMassFormSchema>
) {
  const validatedFields = NewSundayMassFormSchema.safeParse(formValues)

  if (!validatedFields.success) {
    return { error: 'Algunos de los campos son inválidos.' }
  }

  const { userId } = await auth()

  if (!userId) {
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }
  }

  const { parish, evidenceUrl } = validatedFields.data

  const today = new Date()

  const formattedDate = today.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/Lima',
  })

  console.log('Formatted date:', formattedDate)

  const [year, month, day] = formattedDate.split('-')

  return await createSundayMass({
    userId,
    parish,
    evidenceUrl,
    sundayDate: `${year}-${month}-${day}`,
  })
    .then(async () => {
      revalidateTag('sundayMasses')
      return {
        success: 'Se ha enviado tu registro de asistencia a la misa con éxito.',
      }
    })
    .catch((error: NeonDbError) => {
      console.error(error)
      return {
        error: handleDbError(error),
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error: 'Ha ocurrido un error al registrar la misa.',
      }
    })
}

export async function verifyMassRecord(massId: string) {
  if (
    !(await checkRole(UserRole.ADMIN)) &&
    !(await checkRole(UserRole.MANAGER))
  ) {
    return { error: 'No estas autorizado para verificar misas.' }
  }

  const { userId: verifiedById } = await auth()

  if (!verifiedById) {
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }
  }

  return await updateSundayMassRecordVerification(massId, true, verifiedById)
    .then(async () => {
      revalidateTag('sundayMasses')
      return {
        success: 'Se ha verificado la asistencia a misa correctamente.',
      }
    })
    .catch((error: NeonDbError) => {
      console.error(error)
      return {
        error: handleDbError(error),
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error: 'Ha ocurrido un error al verificar la misa.',
      }
    })
}

export async function rejectMassRecord(massId: string) {
  if (
    !(await checkRole(UserRole.ADMIN)) &&
    !(await checkRole(UserRole.MANAGER))
  ) {
    return { error: 'No estas autorizado para rechazar misas.' }
  }

  const { userId: verifiedById } = await auth()

  if (!verifiedById) {
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }
  }

  return await updateSundayMassRecordVerification(massId, false, verifiedById)
    .then(async () => {
      revalidateTag('sundayMasses')
      return {
        success: 'Se ha rechazado la asistencia a misa correctamente.',
      }
    })
    .catch((error: NeonDbError) => {
      console.error(error)
      return {
        error: handleDbError(error),
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error: 'Ha ocurrido un error al rechazar la misa.',
      }
    })
}
