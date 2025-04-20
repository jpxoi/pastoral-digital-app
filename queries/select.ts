import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectEvent,
  SelectUser,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { AttendanceStatus } from '@/types'
import { asc, between, count, desc, eq, sql } from 'drizzle-orm'

/* UsersTable */
export const getAllUsers = async () => {
  return db.query.usersTable.findMany({
    orderBy: (fields) => [
      sql`${fields.firstName} || ' ' || ${fields.lastName}`,
    ],
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

export const getUserSchedule = async (userId: SelectUser['id']) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
    columns: {
      schedule: true,
    },
  })
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
          to_char(current_date + interval '45 days', 'MM-DD')
      )
      OR
      (
        to_char(current_date + interval '45 days', 'MM-DD') < to_char(current_date, 'MM-DD') AND
        (
          to_char(date_of_birth, 'MM-DD') >= to_char(current_date, 'MM-DD') OR
          to_char(date_of_birth, 'MM-DD') <= to_char(current_date + interval '45 days', 'MM-DD')
        )
      )
    `,
    orderBy: () => [
      sql`to_char(date_of_birth, 'MM-DD')`,
      sql`to_char(date_of_birth, 'YYYY')`,
    ],
  })
}

export const getUsersWithNoAttendanceRecord = async (
  eventId: SelectEvent['id']
) => {
  return db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .leftJoin(
      attendanceRecordsTable,
      sql`${attendanceRecordsTable.userId} = ${usersTable.id} AND ${attendanceRecordsTable.eventId} = ${eventId}`
    )
    .where(sql`${attendanceRecordsTable.id} IS NULL`)
}

export const countUsersWithNoAttendanceRecord = async (
  eventId: SelectEvent['id']
) => {
  return db
    .select({
      count: count(usersTable.id),
    })
    .from(usersTable)
    .leftJoin(
      attendanceRecordsTable,
      sql`${attendanceRecordsTable.userId} = ${usersTable.id} AND ${attendanceRecordsTable.eventId} = ${eventId}`
    )
    .where(sql`${attendanceRecordsTable.id} IS NULL`)
    .then((result) => result[0]?.count || 0)
}

/* AttendanceRecordsTable */
export const getAllAttendanceRecords = async () => {
  return db.query.attendanceRecordsTable.findMany({
    with: {
      user: true,
      event: true,
      registeredByUser: true,
    },
    orderBy: (fields) => [desc(fields.checkInTime), desc(fields.userId)],
  })
}

export const getLastAttendanceRecord = async () => {
  return db.query.attendanceRecordsTable.findFirst({
    orderBy: (fields) => [desc(fields.checkInTime)],
    with: {
      user: true,
      registeredByUser: true,
    },
  })
}

export const getAttendanceRecordsByUserId = async (
  userId: SelectUser['id']
) => {
  return db.query.attendanceRecordsTable.findMany({
    where: eq(attendanceRecordsTable.userId, userId),
    orderBy: (fields) => [desc(fields.checkInTime)],
    with: {
      user: true,
      event: true,
      registeredByUser: true,
    },
    limit: 100,
  })
}

export const getAttendanceRecordsByEventId = async (
  eventId: SelectEvent['id']
) => {
  return db.query.attendanceRecordsTable.findMany({
    where: eq(attendanceRecordsTable.eventId, eventId),
    orderBy: (fields) => [desc(fields.checkInTime), desc(fields.userId)],
    with: {
      user: true,
      registeredByUser: true,
    },
    limit: 200,
  })
}

export const getAttendanceCalendar = async () => {
  try {
    // Get all data in a single query with proper joins
    const calendarData = await db
      .select({
        userId: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        eventId: eventsTable.id,
        eventDate: eventsTable.date,
        status: attendanceRecordsTable.status,
      })
      .from(usersTable)
      .leftJoin(eventsTable, sql`1=1`)
      .leftJoin(
        attendanceRecordsTable,
        sql`${attendanceRecordsTable.userId} = ${usersTable.id} AND ${attendanceRecordsTable.eventId} = ${eventsTable.id}`
      )
      .where(sql`${eventsTable.date} IS NOT NULL`)
      .orderBy(
        sql`${usersTable.firstName} || ' ' || ${usersTable.lastName}`,
        eventsTable.date
      )

    // Group the data by user
    const userMap = new Map<string, Record<string, string | null>>()

    for (const record of calendarData) {
      if (!userMap.has(record.userId)) {
        const fullName =
          record.firstName && record.lastName
            ? `${record.firstName} ${record.lastName}`
            : record.firstName || record.lastName || 'Sin nombre'

        userMap.set(record.userId, {
          id: record.userId,
          fullName,
        })
      }

      if (record.eventDate) {
        const dateKey = record.eventDate.toISOString().split('T')[0]
        userMap.get(record.userId)![dateKey] = record.status || null
      }
    }

    return Array.from(userMap.values())
  } catch (error) {
    console.error('Error generating attendance calendar:', error)
    return []
  }
}

/* EventsTable */
export const getAllEvents = async () => {
  return db.query.eventsTable.findMany({
    orderBy: (fields) => [asc(fields.date)],
  })
}

export const getEventById = async (id: SelectEvent['id']) => {
  return db.query.eventsTable.findFirst({
    where: eq(eventsTable.id, id),
  })
}

export const getEventAttendanceStats = async (eventId: SelectEvent['id']) => {
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

export const getTodayEvent = async () => {
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

/* MassesTable */
export const getAllMasses = async () => {
  return db.query.sundayMassesTable.findMany({
    orderBy: (fields) => [desc(fields.createdAt)],
    with: {
      user: true,
      verifier: true,
    },
  })
}

/* Sunday Masses Table */
export const getSundayMassesRecordsByUserId = async (
  userId: SelectUser['id']
) => {
  return db.query.sundayMassesTable.findMany({
    where: eq(sundayMassesTable.userId, userId),
    orderBy: (fields) => [desc(fields.createdAt)],
    with: {
      user: true,
    },
    limit: 100,
  })
}
