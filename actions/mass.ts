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
import {
  getMassRegistrationWindow,
  MASS_REGISTRATION_CLOSED_MESSAGE,
} from '@/lib/mass-registration'
import { z } from 'zod'
import { Permission } from '@/types/permissions'
import { SundayMassStatus } from '@/types'
import { after } from 'next/server'
import { sendUsersPush } from '@/lib/push/send'
import { massReviewMessage } from '@/lib/push/payloads'

function notifyMassReview(
  records: { id: string; userId: string; sundayDate: string }[],
  accepted: boolean
) {
  after(async () => {
    try {
      await sendUsersPush(
        records.map((record) => {
          const message = massReviewMessage(
            record.id,
            record.sundayDate,
            accepted
          )
          return { userId: record.userId, key: message.tag, message }
        })
      )
    } catch {
      console.error('No se pudo enviar la notificación de revisión de misa.')
    }
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

  const window = getMassRegistrationWindow()
  if (!window.isOpen) return { error: MASS_REGISTRATION_CLOSED_MESSAGE }

  return await createSundayMass({
    userId,
    parish,
    evidenceFileKey,
    sundayDate: window.sundayDate,
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
      if (!getMassRegistrationWindow().isOpen)
        return { error: MASS_REGISTRATION_CLOSED_MESSAGE }
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
  if (!(await checkPermission(Permission.MASSES_REVIEW_RECORDS))) {
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
  if (!(await checkPermission(Permission.MASSES_REVIEW_RECORDS))) {
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
