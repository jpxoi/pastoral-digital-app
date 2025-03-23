'use server'

import { handleDbError } from '@/lib/error'
import { createAttendanceRecord } from '@/queries/insert'
import { getLastAttendanceRecord } from '@/queries/select'
import { InsertAttendance } from '@/db/schema'
import { NeonDbError } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { checkRole } from '@/lib/roles'

export const registerAttendanceRecord = async (data: InsertAttendance) => {
  if (!checkRole('admin')) {
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
