import { db } from '@/db/drizzle'
import { attendanceRecordsTable, SelectAttendance } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export const deleteAttendanceRecord = async (id: SelectAttendance['id']) => {
  await db
    .delete(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.id, id))
}

export async function deleteCatechistData(userId: string) {
  // One atomic statement also handles references that do not cascade.
  await db.execute(sql`
    WITH removed_attendance AS (
      DELETE FROM attendance_records WHERE user_id = ${userId} OR registered_by = ${userId}
    ), cleared_verifications AS (
      UPDATE sunday_masses SET verified_by = NULL WHERE verified_by = ${userId}
    ), removed_evidence AS (
      DELETE FROM mass_evidence_files WHERE user_id = ${userId}
    )
    DELETE FROM users WHERE id = ${userId}
  `)
}
