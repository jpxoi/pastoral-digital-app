'use server'

import { logger } from '@/lib/logger'
import { handleDbError } from '@/lib/error'
import {
  createAttendanceRecord,
  createAttendanceRecords,
} from '@/queries/insert'
import {
  getAttendanceRecordForUserEvent,
  getEventForAttendance,
  getUsersWithNoAttendanceRecord,
  getLastAttendanceRecord,
} from '@/queries/select'
import { InsertAttendance, SelectAttendance } from '@/db/schema'
import { NeonDbError } from '@neondatabase/serverless'
import { cacheTags } from '@/lib/cache'
import { updateTag } from 'next/cache'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import {
  AttendanceRecordMethod,
  AttendanceStatus,
  FetchAttendanceProps,
} from '@/types'
import { auth } from '@clerk/nextjs/server'
import { updateAttendanceRecordStatus } from '@/queries/update'
import { deleteAttendanceRecord } from '@/queries/delete'
import { calculateStatus } from '@/lib/attendance'
import { getQrAttendanceContext } from '@/queries/assignments'
import { getAttendanceTurn } from '@/lib/assignments'
import { z } from 'zod'
import { NewAttendanceRecordFormSchema } from '@/schema'
import { formValidationError } from '@/lib/form-validation'
import type { FormActionError } from '@/types/form-actions'
import { after } from 'next/server'
import { sendUsersPush } from '@/lib/push/send'
import { attendanceUpdatedMessage } from '@/lib/push/payloads'

function invalidateAttendance(
  records: readonly { userId: string; eventId: string }[]
) {
  const tags = new Set<string>([cacheTags.attendanceList()])
  for (const record of records) {
    tags.add(cacheTags.userAttendance(record.userId))
    tags.add(cacheTags.eventAttendance(record.eventId))
  }
  for (const tag of tags) updateTag(tag)
}

export const registerAttendanceRecord = async (
  data: InsertAttendance
): Promise<{
  success?: string
  warning?: string
  error?: string
  fieldErrors?: FormActionError['fieldErrors']
  lastAttendanceRecord?: FetchAttendanceProps
}> => {
  if (
    data.method !== AttendanceRecordMethod.MANUAL ||
    !(await checkPermission(Permission.ATTENDANCE_CREATE_RECORDS))
  ) {
    return { error: 'No estás autorizado para registrar asistencias.' }
  }

  const parsed = NewAttendanceRecordFormSchema.safeParse(data)
  if (!parsed.success) return formValidationError(parsed.error)

  const validatedData = { ...data, ...parsed.data }
  return await createAttendanceRecord(validatedData)
    .then(async () => {
      invalidateAttendance([data])
      const lastAttendanceRecord = await getLastAttendanceRecord()

      if (data.status === AttendanceStatus.FALTA_JUSTIFICADA) {
        return {
          warning:
            'El registro se procesará como FALTA NO JUSTIFICADA debido a que la entrada está fuera del horario permitido.',
          lastAttendanceRecord,
        }
      }

      return {
        success: 'Asistencia registrada correctamente.',
        lastAttendanceRecord,
      }
    })
    .catch((error) => {
      logger.error('Failed to register manual attendance', {
        userId: data.userId,
        eventId: data.eventId,
        error,
      })
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al registrar la asistencia.',
      }
    })
}

const qrAttendanceInputSchema = z.object({
  eventId: z.uuid(),
  userId: z.string().min(1),
})

export const registerQrAttendanceRecord = async (input: unknown) => {
  const parsedInput = qrAttendanceInputSchema.safeParse(input)
  if (!parsedInput.success) {
    return { error: 'El código QR o el evento no son válidos.' }
  }

  const { userId, eventId } = parsedInput.data
  const { userId: registeredBy } = await auth()

  if (!registeredBy || !(await checkPermission(Permission.ATTENDANCE_SCAN))) {
    return { error: 'No estás autorizado para registrar asistencias.' }
  }

  try {
    const context = await getQrAttendanceContext(eventId, userId)
    if (!context) {
      return { error: 'El evento seleccionado ya no está disponible para hoy.' }
    }
    const { event } = context
    if (!context.userId) {
      return {
        error:
          'No se encontró al catequista en la base de datos. Verifica que esté registrado correctamente.',
      }
    }

    const now = new Date()
    const firstTurnStartsAt = new Date(event.date)
    const scanningOpensAt = new Date(
      firstTurnStartsAt.getTime() - 3 * 60 * 60 * 1000
    )

    if (now < scanningOpensAt) {
      return {
        error:
          'El escaneo estará disponible 3 horas antes del inicio del evento.',
      }
    }

    if (now > new Date(event.endDate)) {
      return {
        error:
          'No puedes registrar asistencia después de la hora de finalización del evento.',
      }
    }

    if (context.existingRecordId) {
      return {
        error:
          'Este catequista ya tiene asistencia registrada para el evento actual.',
      }
    }

    const turnUsed = getAttendanceTurn(context.assignments)
    if (!turnUsed) {
      return {
        error: 'El catequista no tiene asignaciones que definan su turno.',
      }
    }
    const eventTime = turnUsed === 'first' ? event.date : event.secondTurnDate

    await createAttendanceRecord({
      userId,
      eventId,
      checkInTime: now,
      status: calculateStatus(now, new Date(eventTime)),
      registeredBy,
      method: AttendanceRecordMethod.QR,
      turnUsed,
    })

    invalidateAttendance([{ userId, eventId }])
    const lastAttendanceRecord = await getAttendanceRecordForUserEvent(
      userId,
      eventId
    )

    return {
      success: 'Asistencia registrada correctamente.',
      lastAttendanceRecord,
    }
  } catch (error) {
    logger.error('Failed to register QR attendance', { userId, eventId, error })
    return {
      error:
        error instanceof Error && error.cause instanceof NeonDbError
          ? handleDbError(error.cause)
          : 'Ha ocurrido un error al registrar la asistencia.',
    }
  }
}

export const registerAttendanceRecords = async (data: InsertAttendance[]) => {
  if (
    data.some((record) => record.method !== AttendanceRecordMethod.MANUAL) ||
    !(await checkPermission(Permission.ATTENDANCE_CREATE_RECORDS))
  ) {
    return { error: 'No estás autorizado para registrar asistencias.' }
  }

  return await createAttendanceRecords(data)
    .then(() => {
      invalidateAttendance(data)

      return {
        success: 'Asistencias registrada correctamente.',
      }
    })
    .catch((error) => {
      logger.error('Failed to register attendance records', {
        recordCount: data.length,
        error,
      })
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al registrar las asistencias.',
      }
    })
}

export const setAttendanceRecordStatus = async (
  status: AttendanceStatus,
  recordId: SelectAttendance['id']
) => {
  if (!(await checkPermission(Permission.ATTENDANCE_UPDATE_RECORD_STATUS))) {
    return { error: 'No estás autorizado para modificar asistencias.' }
  }

  return await updateAttendanceRecordStatus(status, recordId)
    .then(async (records) => {
      invalidateAttendance(records)
      after(async () => {
        try {
          await sendUsersPush(
            records.map((record) => ({
              userId: record.userId,
              key: `attendance:${record.id}:${record.updatedAt.toISOString()}`,
              message: attendanceUpdatedMessage(record.id),
            }))
          )
        } catch {
          logger.error('No se pudo enviar la notificación de asistencia.')
        }
      })

      return {
        success: 'Estado de asistencia modificado correctamente.',
      }
    })
    .catch((error) => {
      logger.error('Failed to update attendance status', {
        recordId,
        status,
        error,
      })
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al modificar el estado de asistencia.',
      }
    })
}

export const fillAbsenceRecords = async (eventId: string) => {
  if (!(await checkPermission(Permission.ATTENDANCE_FILL_ABSENCES))) {
    return { error: 'No estás autorizado para modificar asistencias.' }
  }

  const event = await getEventForAttendance(eventId)

  if (!event) {
    return { error: 'No se encontró el evento.' }
  }

  const absentUsers = await getUsersWithNoAttendanceRecord(eventId)

  if (!absentUsers.length) {
    return { error: 'No hay usuarios sin registro para relenar faltas.' }
  }

  const { userId: registeredBy } = await auth()

  logger.info('Creating absence records', {
    eventId,
    recordCount: absentUsers.length,
  })

  const absenceRecords = absentUsers.map((user) => ({
    userId: user.id,
    eventId,
    checkInTime: new Date(event.endDate),
    status: AttendanceStatus.FALTA_INJUSTIFICADA,
    registeredBy: registeredBy || '',
    method: AttendanceRecordMethod.MANUAL,
  }))

  try {
    await createAttendanceRecords(absenceRecords)

    invalidateAttendance(absenceRecords)

    return {
      success: 'Faltas rellenadas correctamente.',
    }
  } catch (error) {
    logger.error('Failed to fill absence records', {
      eventId,
      recordCount: absenceRecords.length,
      error,
    })
    return {
      error:
        error instanceof Error && error.cause instanceof NeonDbError
          ? handleDbError(error.cause)
          : 'Ha ocurrido un error al rellenar las faltas del evento.',
    }
  }
}

export const removeAttendanceRecord = async (
  recordId: SelectAttendance['id']
) => {
  if (!(await checkPermission(Permission.ATTENDANCE_DELETE_RECORDS))) {
    return { error: 'No estás autorizado para eliminar asistencias.' }
  }
  return await deleteAttendanceRecord(recordId)
    .then(async (records) => {
      invalidateAttendance(records)
      return {
        success: 'Asistencia eliminada correctamente.',
      }
    })
    .catch((error) => {
      logger.error('Failed to delete attendance record', { recordId, error })
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al eliminar la asistencia.',
      }
    })
}
