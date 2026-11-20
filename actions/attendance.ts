'use server'

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
  getTodayEvents,
  getUserSchedule,
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
import { UserSchedule } from '@/types'
import { z } from 'zod'

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
  lastAttendanceRecord?: FetchAttendanceProps
}> => {
  if (
    data.method !== AttendanceRecordMethod.MANUAL ||
    !(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS))
  ) {
    return { error: 'No estás autorizado para registrar asistencias.' }
  }

  return await createAttendanceRecord(data)
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
      console.error(error)
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
    const todayEvents = await getTodayEvents()
    if (!todayEvents.some((event) => event.id === eventId)) {
      return { error: 'El evento seleccionado ya no está disponible para hoy.' }
    }

    const [event, scannedUser] = await Promise.all([
      getEventForAttendance(eventId),
      getUserSchedule(userId),
    ])

    if (!event) return { error: 'No se encontró el evento seleccionado.' }
    if (!scannedUser) {
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

    const existingRecord = await getAttendanceRecordForUserEvent(
      userId,
      eventId
    )
    if (existingRecord) {
      return {
        error:
          'Este catequista ya tiene asistencia registrada para el evento actual.',
      }
    }

    const eventTime =
      scannedUser.schedule === UserSchedule.FULL_TIME ||
      scannedUser.schedule === UserSchedule.PRIMERA_COMUNION ||
      scannedUser.schedule === UserSchedule.LOGISTICA ||
      scannedUser.schedule === UserSchedule.SEMILLEROS
        ? event.date
        : event.secondTurnDate

    await createAttendanceRecord({
      userId,
      eventId,
      checkInTime: now,
      status: calculateStatus(now, new Date(eventTime)),
      registeredBy,
      method: AttendanceRecordMethod.QR,
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
    console.error(error)
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
    !(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS))
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
      console.error(error)
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
  if (!(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS))) {
    return { error: 'No estás autorizado para modificar asistencias.' }
  }

  return await updateAttendanceRecordStatus(status, recordId)
    .then(async (records) => {
      invalidateAttendance(records)

      return {
        success: 'Estado de asistencia modificado correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al modificar el estado de asistencia.',
      }
    })
}

export const fillAbsenceRecords = async (eventId: string) => {
  if (!(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS))) {
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

  console.log(
    `Creating ${absentUsers.length} absence records for event ${eventId}`
  )

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
    console.error(error)
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
  if (!(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS))) {
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
      console.error(error)
      return {
        error:
          error.cause instanceof NeonDbError
            ? handleDbError(error.cause)
            : 'Ha ocurrido un error al eliminar la asistencia.',
      }
    })
}
