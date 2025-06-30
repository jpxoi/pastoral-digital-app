'use server'

import { handleDbError } from '@/lib/error'
import {
  createAttendanceRecord,
  createAttendanceRecords,
} from '@/queries/insert'
import {
  getUsersWithNoAttendanceRecord,
  getEventById,
  getLastAttendanceRecord,
} from '@/queries/select'
import { InsertAttendance, SelectAttendance } from '@/db/schema'
import { NeonDbError } from '@neondatabase/serverless'
import { revalidateTag } from 'next/cache'
import { checkRole } from '@/lib/roles'
import {
  AttendanceRecordMethod,
  AttendanceStatus,
  FetchAttendanceProps,
  UserRole,
} from '@/types'
import { auth } from '@clerk/nextjs/server'
import { updateAttendanceRecordStatus } from '@/queries/update'
import { deleteAttendanceRecord } from '@/queries/delete'

export const registerAttendanceRecord = async (
  data: InsertAttendance
): Promise<{
  success?: string
  warning?: string
  error?: string
  lastAttendanceRecord?: FetchAttendanceProps
}> => {
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estas autorizado para registrar asistencias.' }
  }

  return await createAttendanceRecord(data)
    .then(async () => {
      const lastAttendanceRecord = await getLastAttendanceRecord()

      revalidateTag('attendance')

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
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al registrar la asistencia.',
      }
    })
}

export const registerAttendanceRecords = async (data: InsertAttendance[]) => {
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estas autorizado para registrar asistencias.' }
  }

  return await createAttendanceRecords(data)
    .then(() => {
      revalidateTag('attendance')

      return {
        success: 'Asistencias registrada correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al registrar las asistencias.',
      }
    })
}

export const setAttendanceRecordStatus = async (
  status: AttendanceStatus,
  recordId: SelectAttendance['id'],
  userId: SelectAttendance['userId']
) => {
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estas autorizado para modificar asistencias.' }
  }

  return await updateAttendanceRecordStatus(status, recordId)
    .then(async () => {
      revalidateTag('attendance')

      return {
        success: 'Estado de asistencia modificado correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al modificar el estado de asistencia.',
      }
    })
}

export const fillAbsenceRecords = async (eventId: number) => {
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estas autorizado para modificar asistencias.' }
  }

  const event = await getEventById(eventId)

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

    revalidateTag('attendance')

    return {
      success: 'Faltas rellenadas correctamente.',
    }
  } catch (error) {
    console.error(error)
    return {
      error:
        error instanceof NeonDbError
          ? handleDbError(error)
          : 'Ha ocurrido un error al rellenar las faltas del evento.',
    }
  }
}

export const removeAttendanceRecord = async (
  recordId: SelectAttendance['id'],
  userId: SelectAttendance['userId']
) => {
  if (!(await checkRole(UserRole.ADMIN))) {
    return { error: 'No estas autorizado para eliminar asistencias.' }
  }
  return await deleteAttendanceRecord(recordId)
    .then(async () => {
      revalidateTag('attendance')
      return {
        success: 'Asistencia eliminada correctamente.',
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error:
          error instanceof NeonDbError
            ? handleDbError(error)
            : 'Ha ocurrido un error al eliminar la asistencia.',
      }
    })
}

