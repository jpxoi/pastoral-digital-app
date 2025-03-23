import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectUser,
  usersTable,
} from '@/db/schema'
import { between, desc, eq, sql } from 'drizzle-orm'


/* UsersTable */
export const getAllUsers = async () => {
  return db.query.usersTable.findMany({
    orderBy: (fields) => [fields.firstName],
  })
}

export const getUserById = async (id: SelectUser['id']) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  })
}

export const getUserBirthdays = async () => {
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


/* AttendanceRecordsTable */
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

/* EventsTable */
export const getAllEvents = async () => {
  return db.query.eventsTable.findMany({
    orderBy: (fields) => [desc(fields.date)],
  })
}

export const getUpcomingEvents = async () => {
  return db.query.eventsTable.findMany({
    where: sql`date >= current_date`,
    orderBy: (fields) => [fields.date],
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
