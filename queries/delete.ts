import { db } from '@/db/drizzle'
import { attendanceRecordsTable, SelectAttendance } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

export const deleteAttendanceRecord = async (id: SelectAttendance['id']) => {
  return db
    .delete(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.id, id))
    .returning({
      userId: attendanceRecordsTable.userId,
      eventId: attendanceRecordsTable.eventId,
    })
}

export async function deleteCatechistData(userId: string) {
  // Capture file keys before deleting the user; the FK cascades its file metadata.
  const result = await db.execute(sql`
    WITH evidence_files AS MATERIALIZED (
      SELECT key, state FROM mass_evidence_files WHERE user_id = ${userId}
    ), removed_attendance AS (
      DELETE FROM attendance_records
      WHERE registered_by = ${userId} AND user_id <> ${userId}
    ), cleared_verifications AS (
      UPDATE sunday_masses SET verified_by = NULL
      WHERE verified_by = ${userId} AND user_id <> ${userId}
    ), removed_orphan_evidence AS (
      DELETE FROM mass_evidence_files
      WHERE user_id = ${userId}
        AND NOT EXISTS (SELECT 1 FROM users WHERE id = ${userId})
    ), removed_user AS (
      DELETE FROM users WHERE id = ${userId} RETURNING id
    )
    SELECT key, state FROM evidence_files
  `)

  return result.rows as { key: string; state: string }[]
}
