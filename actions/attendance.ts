'use server'

import { handleDbError } from '@/lib/error'
import { createAttendanceRecord } from '@/queries/insert'
import { getLastAttendanceRecord } from '@/queries/select'
import { InsertAttendance } from '@/schema'
import { NeonDbError } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'

export const registerAttendanceRecord = async (data: InsertAttendance) => {
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

export const revalidateAttendanceRecords = async () => {
  revalidatePath('/admin/records')
}
