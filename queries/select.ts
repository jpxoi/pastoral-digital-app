'use server'

import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectUser,
  usersTable,
} from '@/db/schema'
import { between, desc, eq, sql } from 'drizzle-orm'

export async function getUserById(id: SelectUser['id']) {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function getAttendanceRecordsForLast24Hours() {
  return db.query.attendanceRecordsTable.findMany({
    where: (fields, { between, sql }) =>
      between(fields.checkInTime, sql`now() - interval '1 day'`, sql`now()`),
    with: {
      user: true,
    },
  })
}

export const getAllAttendanceRecords = async () => {
  return db.query.attendanceRecordsTable.findMany({
    with: {
      user: true,
    },
    orderBy: (fields) => [desc(fields.checkInTime)],
  })
}

export async function getLastAttendanceRecord() {
  return db.query.attendanceRecordsTable.findFirst({
    orderBy: (fields) => [desc(fields.checkInTime)],
    with: {
      user: true,
    },
  })
}

export async function getAttendanceRecordsByUserId(userId: SelectUser['id']) {
  return db.query.attendanceRecordsTable.findMany({
    where: eq(attendanceRecordsTable.userId, userId),
    orderBy: (fields) => [desc(fields.checkInTime)],
    with: {
      user: true,
    },
    limit: 100,
  })
}

export async function getTodayEvent() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return db.query.eventsTable.findFirst({
    where: between(
      eventsTable.date,
      today,
      new Date(today.getTime() + 86400000)
    ),
  })
}
