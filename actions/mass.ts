'use server'

import { handleDbError } from '@/lib/error'
import { checkPermission } from '@/lib/roles'
import { createSundayMass } from '@/queries/insert'
import { updateSundayMassRecordVerification } from '@/queries/update'
import { NewSundayMassFormSchema } from '@/schema'
import { auth } from '@clerk/nextjs/server'
import { NeonDbError } from '@neondatabase/serverless'
import { cacheTags } from '@/lib/cache'
import { updateTag } from 'next/cache'
import { TZDate } from '@date-fns/tz'
import { z } from 'zod'
import { Permission } from '@/types/permissions'
import { SundayMassStatus } from '@/types'
import { after } from 'next/server'
import { sendUserPush } from '@/lib/push/send'
import { massReviewMessage } from '@/lib/push/payloads'

function notifyMassReview(
  records: { id: string; userId: string; sundayDate: string }[],
  accepted: boolean
) {
  after(async () => {
    await Promise.all(
      records.map(async (record) => {
        try {
          const message = massReviewMessage(
            record.id,
            record.sundayDate,
            accepted
          )
          await sendUserPush(record.userId, message.tag, message)
        } catch {
          console.error(
            'No se pudo enviar la notificación de revisión de misa.'
          )
        }
      })
    )
  })
}

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

  const { parish, evidenceFileKey } = validatedFields.data

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
    sundayDate: `${year}-${month}-${day}`,
  })
    .then(() => {
      updateTag(cacheTags.massesList())
      updateTag(cacheTags.userMasses(userId))
      return {
        success: 'Se ha enviado tu registro de asistencia a la misa con éxito.',
      }
    })
    .catch((error) => {
      console.error(error)
      if (error instanceof Error && error.message === 'EVIDENCE_UNAVAILABLE')
        return {
          error:
            'La evidencia no está disponible o no te pertenece. Vuelve a adjuntar la imagen.',
        }
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al registrar la misa.',
      }
    })
}

export async function verifyMassRecord(massId: string) {
  if (!(await checkPermission(Permission.MASSES_MANAGE))) {
    return { error: 'No estás autorizado para verificar misas.' }
  }

  const { userId: verifiedById } = await auth()

  if (!verifiedById) {
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }
  }

  return await updateSundayMassRecordVerification(
    massId,
    SundayMassStatus.ACCEPTED,
    verifiedById
  )
    .then((records) => {
      notifyMassReview(records, true)
      updateTag(cacheTags.massesList())
      for (const record of records)
        updateTag(cacheTags.userMasses(record.userId))
      return {
        success: 'Se ha verificado la asistencia a misa correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al verificar la misa.',
      }
    })
}

export async function rejectMassRecord(massId: string) {
  if (!(await checkPermission(Permission.MASSES_MANAGE))) {
    return { error: 'No estás autorizado para rechazar misas.' }
  }

  const { userId: verifiedById } = await auth()

  if (!verifiedById) {
    return {
      error:
        'No se pudo obtener el usuario. Por favor, vuelve a iniciar sesión.',
    }
  }

  return await updateSundayMassRecordVerification(
    massId,
    SundayMassStatus.REJECTED,
    verifiedById
  )
    .then((records) => {
      notifyMassReview(records, false)
      updateTag(cacheTags.massesList())
      for (const record of records)
        updateTag(cacheTags.userMasses(record.userId))
      return {
        success: 'Se ha rechazado la asistencia a misa correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al rechazar la misa.',
      }
    })
}
