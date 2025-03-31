import { db } from '@/db/drizzle'
import { attendanceRecordsTable, SelectAttendance } from '@/db/schema'
import { AttendanceStatus } from '@/types'
import { eq } from 'drizzle-orm'

export const updateAttendanceRecordStatus = async (
  status: AttendanceStatus,
  recordId: SelectAttendance['id']
) => {
  return db
    .update(attendanceRecordsTable)
    .set({ status, updatedAt: new Date() })
    .where(eq(attendanceRecordsTable.id, recordId))
}
