'use server'

import { handleDbError } from '@/lib/error'
import { checkRole } from '@/lib/roles'
import { createSundayMass } from '@/queries/insert'
import { updateSundayMassRecordVerification } from '@/queries/update'
import { NewSundayMassFormSchema } from '@/schema'
import { UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NeonDbError } from '@neondatabase/serverless'
import { updateTag } from 'next/cache'
import { TZDate } from '@date-fns/tz'
import { z } from 'zod'

export async function postNewMassRecord(
  formValues: z.infer<typeof NewSundayMassFormSchema>
) {
  const validatedFields = NewSundayMassFormSchema.safeParse(formValues)

  if (!validatedFields.success)
    return { error: 'Algunos de los campos son inválidos.' }

  const { userId } = await auth()

  if (!userId)
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }

  const { parish, evidenceFileKey, evidenceFileHash } = validatedFields.data

  const peruDate = new TZDate(new Date(), 'America/Lima')

  const isValidTimeframe =
    peruDate.getDay() === 0 || // Sunday
    (peruDate.getDay() === 1 && peruDate.getHours() < 18) // Monday before 6 PM

  if (!isValidTimeframe)
    return {
      error:
        'El registro de misa solo está disponible los domingos y lunes hasta las 6:00 PM.',
    }

  if (peruDate.getDay() === 1) {
    peruDate.setDate(peruDate.getDate() - 1)
  }

  const year = peruDate.getFullYear()
  const month = String(peruDate.getMonth() + 1).padStart(2, '0')
  const day = String(peruDate.getDate()).padStart(2, '0')

  return await createSundayMass({
    userId,
    parish,
    evidenceFileKey,
    evidenceFileHash,
    sundayDate: `${year}-${month}-${day}`,
  })
    .then(() => {
      updateTag('sundayMasses')
      return {
        success: 'Se ha enviado tu registro de asistencia a la misa con éxito.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al registrar la misa.',
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
    .then(() => {
      updateTag('sundayMasses')
      return {
        success: 'Se ha verificado la asistencia a misa correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al verificar la misa.',
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
    .then(() => {
      updateTag('sundayMasses')
      return {
        success: 'Se ha rechazado la asistencia a misa correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al rechazar la misa.',
      }
    })
}
