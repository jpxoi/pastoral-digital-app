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
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  })
}

export async function getUserBirthdays() {
  return db.query.usersTable.findMany({
    where: sql`
      (
        to_char(date_of_birth, 'MM-DD') BETWEEN 
          to_char(current_date, 'MM-DD') AND 
          to_char(current_date + interval '30 days', 'MM-DD')
      )
      OR
      (
        to_char(current_date + interval '30 days', 'MM-DD') < to_char(current_date, 'MM-DD') AND
        (
          to_char(date_of_birth, 'MM-DD') >= to_char(current_date, 'MM-DD') OR
          to_char(date_of_birth, 'MM-DD') <= to_char(current_date + interval '30 days', 'MM-DD')
        )
      )
    `,
    orderBy: () => [
      sql`to_char(date_of_birth, 'MM-DD')`,
      sql`to_char(date_of_birth, 'YYYY')`,
    ],
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
