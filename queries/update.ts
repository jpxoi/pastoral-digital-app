import { db } from '@/db/drizzle'
import { attendanceRecordsTable } from '@/db/schema'
import { AttendanceStatus } from '@/types'
import { eq } from 'drizzle-orm'

export async function updateAttendanceRecordStatus(
  status: AttendanceStatus,
  recordId: string
) {
  return db
    .update(attendanceRecordsTable)
    .set({ status, updatedAt: new Date() })
    .where(eq(attendanceRecordsTable.id, recordId))
}
