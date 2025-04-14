import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  SelectAttendance,
  SelectSundayMass,
  sundayMassesTable,
} from '@/db/schema'
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

export const updateSundayMassRecordVerification = async (
  recordId: SelectSundayMass['id'],
  verified: SelectSundayMass['verified'],
  verifiedBy: SelectSundayMass['verifiedBy']
) => {
  return db
    .update(sundayMassesTable)
    .set({
      verified,
      verifiedBy,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(sundayMassesTable.id, recordId))
}
