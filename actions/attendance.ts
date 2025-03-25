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
import { InsertAttendance } from '@/db/schema'
import { NeonDbError } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { checkRole } from '@/lib/roles'
import { AttendanceStatus, UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'

export const registerAttendanceRecord = async (data: InsertAttendance) => {
  if (!checkRole(UserRole.ADMIN)) {
    return { error: 'No estas autorizado para registrar asistencias.' }
  }

  return createAttendanceRecord(data)
    .then(async () => {
      const lastAttendanceRecord = await getLastAttendanceRecord()

      revalidatePath('/admin/records')

      return {
        success: 'Asistencia registrada correctamente.',
        lastAttendanceRecord,
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
        error: 'Ha ocurrido un error al registrar la asistencia.',
      }
    })
}

export const fillAbsenceRecords = async (eventId: number) => {
  if (!checkRole(UserRole.ADMIN)) {
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

  const { userId } = await auth()

  console.log(
    `Creating ${absentUsers.length} absence records for event ${eventId}`
  )

  const absenceRecords = absentUsers.map((user) => ({
    userId: user.id,
    eventId,
    checkInTime: event.endDate,
    status: AttendanceStatus.FALTA_INJUSTIFICADA,
    registeredBy: userId || '',
    method: 'MANUAL',
  }))

  try {
    await createAttendanceRecords(absenceRecords)

    revalidatePath('/admin/records')

    return {
      success: 'Faltas rellenadas correctamente.',
    }
  } catch (error) {
    console.error(error)
    if (error instanceof NeonDbError) {
      return { error: handleDbError(error) }
    }
    return { error: 'Ha ocurrido un error al rellenar las faltas del evento.' }
  }
}
