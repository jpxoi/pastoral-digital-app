import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  SelectAttendance,
  SelectSundayMass,
  SelectUser,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { AttendanceStatus, UserRole } from '@/types'
import { and, eq } from 'drizzle-orm'
import { SundayMassStatus } from '@/types'

export const updateUserSchedule = async (
  userId: SelectUser['id'],
  schedule: SelectUser['schedule']
) => {
  return db
    .update(usersTable)
    .set({ schedule, updatedAt: new Date() })
    .where(eq(usersTable.id, userId))
}

export const updateUserRole = async (
  userId: SelectUser['id'],
  role: UserRole
) => {
  return db
    .update(usersTable)
    .set({ role, updatedAt: new Date() })
    .where(eq(usersTable.id, userId))
    .returning({ id: usersTable.id })
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
  status: SelectSundayMass['status'],
  verifiedBy: SelectSundayMass['verifiedBy']
) => {
  const rows = await db
    .update(sundayMassesTable)
    .set({
      status,
      verifiedBy,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(sundayMassesTable.id, recordId),
        eq(sundayMassesTable.status, SundayMassStatus.PENDING)
      )
    )
    .returning({ id: sundayMassesTable.id })
  if (!rows.length)
    throw new Error(
      'El registro ya fue revisado o no existe. Actualiza la página.'
    )
  return rows
}
