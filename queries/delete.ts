import { db } from '@/db/drizzle'
import { attendanceRecordsTable, SelectAttendance } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const deleteAttendanceRecord = async (id: SelectAttendance['id']) => {
  await db
    .delete(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.id, id))
}
