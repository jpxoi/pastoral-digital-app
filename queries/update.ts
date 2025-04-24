import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  SelectAttendance,
  SelectSundayMass,
  SelectUser,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { AttendanceStatus } from '@/types'
import { eq } from 'drizzle-orm'

export const updateUserSchedule = async (
  userId: SelectUser['id'],
  schedule: SelectUser['schedule']
) => {
  return db
    .update(usersTable)
    .set({ schedule, updatedAt: new Date() })
    .where(eq(usersTable.id, userId))
}

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
