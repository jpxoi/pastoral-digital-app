import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectUser,
  usersTable,
} from '@/db/schema'
import { AttendanceStatus } from '@/types'
import { and, between, count, desc, eq, notInArray, or, sql } from 'drizzle-orm'

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

export const countAllUsers = async () => {
  return db.$count(usersTable)
}

export const getUserAttendanceStats = async (userId: SelectUser['id']) => {
  const [
    stats = {
      totalOnTime: 0,
      totalLate: 0,
      totalAbsences: 0,
    },
  ] = await db
    .select({
      totalOnTime: count(
        sql`case when ${attendanceRecordsTable.status} = ${AttendanceStatus.A_TIEMPO} then 1 end`
      ),
      totalLate: count(
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.TARDANZA}, ${AttendanceStatus.TARDANZA_JUSTIFICADA}, ${AttendanceStatus.DOBLE_TARDANZA}) then 1 end`
      ),
      totalAbsences: count(
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.FALTA_JUSTIFICADA}, ${AttendanceStatus.FALTA_INJUSTIFICADA}) then 1 end`
      ),
    })
    .from(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.userId, userId))

  return stats
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

export async function getUsersWithNoAttendanceRecord(eventId: number) {
  return db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(
      notInArray(
        usersTable.id,
        db
          .select({ userId: attendanceRecordsTable.userId })
          .from(attendanceRecordsTable)
          .where(eq(attendanceRecordsTable.eventId, eventId))
      )
    )
}

export async function countUsersWithNoAttendanceRecord(eventId: number) {
  return db
    .select({
      count: count(usersTable.id),
    })
    .from(usersTable)
    .where(
      notInArray(
        usersTable.id,
        db
          .select({ userId: attendanceRecordsTable.userId })
          .from(attendanceRecordsTable)
          .where(eq(attendanceRecordsTable.eventId, eventId))
      )
    )
    .then((result) => result[0]?.count || 0)
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

export async function getAttendanceRecordsByEventId(eventId: number) {
  return db.query.attendanceRecordsTable.findMany({
    where: eq(attendanceRecordsTable.eventId, eventId),
    orderBy: (fields) => [desc(fields.checkInTime)],
    with: {
      user: true,
    },
    limit: 100,
  })
}

export async function getJustifiedAttendanceRecords(eventId: number) {
  return db.query.attendanceRecordsTable.findMany({
    where: and(
      eq(attendanceRecordsTable.eventId, eventId),
      or(
        eq(attendanceRecordsTable.status, AttendanceStatus.FALTA_JUSTIFICADA),
        eq(attendanceRecordsTable.status, AttendanceStatus.TARDANZA_JUSTIFICADA)
      )
    ),
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

export const getEventById = async (id: number) => {
  return db.query.eventsTable.findFirst({
    where: eq(eventsTable.id, id),
  })
}

export const getEventAttendanceStats = async (eventId: number) => {
  const [
    stats = {
      totalOnTime: 0,
      totalLate: 0,
      totalLateJustified: 0,
      totalAbsentees: 0,
      totalAbsenteesJustified: 0,
    },
  ] = await db
    .select({
      totalOnTime: count(
        sql`case when ${attendanceRecordsTable.status} = ${AttendanceStatus.A_TIEMPO} then 1 end`
      ),
      totalLate: count(
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.TARDANZA}, ${AttendanceStatus.TARDANZA_JUSTIFICADA}, ${AttendanceStatus.DOBLE_TARDANZA}) then 1 end`
      ),
      totalLateJustified: count(
        sql`case when ${attendanceRecordsTable.status} = ${AttendanceStatus.TARDANZA_JUSTIFICADA} then 1 end`
      ),
      totalAbsentees: count(
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.FALTA_JUSTIFICADA}, ${AttendanceStatus.FALTA_INJUSTIFICADA}) then 1 end`
      ),
      totalAbsenteesJustified: count(
        sql`case when ${attendanceRecordsTable.status} = ${AttendanceStatus.FALTA_JUSTIFICADA} then 1 end`
      ),
    })
    .from(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.eventId, eventId))
    .groupBy() // Group all results together

  return stats
}

export const getEventWithAttendanceRecords = async (eventId: number) => {
  return db.query.eventsTable.findFirst({
    where: eq(eventsTable.id, eventId),
    with: {
      attendanceRecords: {
        orderBy: (fields) => [desc(fields.checkInTime)],
        with: {
          user: true,
        },
      },
    },
  })
}

export const getUpcomingEvents = async () => {
  return db.query.eventsTable.findMany({
    where: sql`date >= current_date`,
    orderBy: (fields) => [fields.date],
    with: {
      location: true,
    },
    limit: 10,
  })
}

export const getPastEvents = async () => {
  return db.query.eventsTable.findMany({
    where: sql`date < current_date`,
    orderBy: (fields) => [desc(fields.date)],
    with: {
      location: true,
    },
    limit: 10,
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
