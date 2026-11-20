import { logger } from '@/lib/logger'
import { getPeruDateKey } from '@/lib/birthday'
import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectEvent,
  SelectUser,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { AttendanceStatus, SundayMassStatus } from '@/types'
import { asc, count, desc, eq, gte, lt, sql } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'
import { cacheTags } from '@/lib/cache'
import { TZDate } from '@date-fns/tz'
import { assignmentRelations } from '@/queries/assignments'

/* UsersTable */
export const getUserForRoleChange = async (id: SelectUser['id']) => {
  return db.query.usersTable.findFirst({
    columns: { id: true, role: true },
    where: eq(usersTable.id, id),
  })
}

export async function getAllUsers() {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.usersList(), cacheTags.assignments())

  return db.query.usersTable.findMany({
    with: {
      catechistAssignments: { with: assignmentRelations },
    },
    orderBy: (fields) => [
      sql`${fields.firstName} || ' ' || ${fields.lastName}`,
    ],
  })
}

export async function countAllUsers() {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.usersList())

  return db.$count(usersTable)
}

async function getUserBirthdaysForDate(peruDate: string) {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.usersList())

  return db.query.usersTable.findMany({
    columns: { id: true, firstName: true, lastName: true, dateOfBirth: true },
    where: sql`
    (
      to_char(date_of_birth, 'MM-DD') BETWEEN
        to_char((${peruDate}::date), 'MM-DD') AND
        to_char((${peruDate}::date) + interval '60 days', 'MM-DD')
    )
    OR
    (
      to_char((${peruDate}::date) + interval '60 days', 'MM-DD') < to_char((${peruDate}::date), 'MM-DD') AND
      (
        to_char(date_of_birth, 'MM-DD') >= to_char((${peruDate}::date), 'MM-DD') OR
        to_char(date_of_birth, 'MM-DD') <= to_char((${peruDate}::date) + interval '60 days', 'MM-DD')
      )
    )
  `,
    orderBy: () => [
      sql`to_char(date_of_birth, 'MM-DD')`,
      sql`to_char(date_of_birth, 'YYYY')`,
    ],
  })
}

export const getUserBirthdays = (now: Date) =>
  getUserBirthdaysForDate(getPeruDateKey(now))

export async function getUserAttendanceStats(userId: SelectUser['id']) {
  'use cache'
  cacheLife('hours')
  cacheTag(cacheTags.attendance(), cacheTags.userAttendance(userId))

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
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.TARDANZA}, ${AttendanceStatus.TARDANZA_JUSTIFICADA}) then 1 end`
      ),
      totalAbsences: count(
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.FALTA_JUSTIFICADA}, ${AttendanceStatus.FALTA_INJUSTIFICADA}) then 1 end`
      ),
    })
    .from(attendanceRecordsTable)
    .where(eq(attendanceRecordsTable.userId, userId))

  return stats
}

export const getUsersWithNoAttendanceRecord = async (
  eventId: SelectEvent['id']
) => {
  return db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      studentCode: usersTable.studentCode,
    })
    .from(usersTable)
    .leftJoin(
      attendanceRecordsTable,
      sql`${attendanceRecordsTable.userId} = ${usersTable.id} AND ${attendanceRecordsTable.eventId} = ${eventId}`
    )
    .where(sql`${attendanceRecordsTable.id} IS NULL`)
}

/* AttendanceRecordsTable */
export async function getAllAttendanceRecords() {
  'use cache'
  cacheLife('hours')
  cacheTag(
    cacheTags.attendance(),
    cacheTags.attendanceList(),
    cacheTags.usersList(),
    cacheTags.eventsList()
  )

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
    orderBy: (fields) => [desc(fields.id)],
    with: {
      user: true,
      registeredByUser: true,
    },
  })
}

export async function getAttendanceRecordsByUserId(
  userId: SelectUser['id'],
  limit: number | null = 100
) {
  'use cache'
  cacheLife('hours')
  cacheTag(
    cacheTags.attendance(),
    cacheTags.userAttendance(userId),
    cacheTags.usersList(),
    cacheTags.eventsList()
  )

  return db.query.attendanceRecordsTable.findMany({
    where: eq(attendanceRecordsTable.userId, userId),
    orderBy: (fields) => [desc(fields.checkInTime), desc(fields.eventId)],
    with: {
      user: true,
      event: true,
      registeredByUser: true,
    },
    limit: limit ?? undefined,
  })
}

export async function getAttendanceRecordsByEventId(
  eventId: SelectEvent['id']
) {
  'use cache'
  cacheLife('hours')
  cacheTag(
    cacheTags.attendance(),
    cacheTags.eventAttendance(eventId),
    cacheTags.usersList()
  )

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

async function getAttendanceCalendarForDate(peruDate: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(
    cacheTags.attendance(),
    cacheTags.attendanceList(),
    cacheTags.usersList(),
    cacheTags.eventsList()
  )

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
      .where(
        sql`${eventsTable.date} IS NOT NULL AND ${eventsTable.date}::date <= ${peruDate}::date`
      )
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
        const dateKey = new Date(record.eventDate).toISOString().split('T')[0]
        userMap.get(record.userId)![dateKey] = record.status || null
      }
    }

    return Array.from(userMap.values())
  } catch (error) {
    logger.error('Error generating attendance calendar:', { error })
    throw error
  }
}

export const getAttendanceCalendar = (now: Date) =>
  getAttendanceCalendarForDate(getPeruDateKey(now))

/* EventsTable */
export async function getAllEvents() {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.eventsList())

  return db.query.eventsTable.findMany({
    orderBy: (fields) => [desc(fields.date)],
    with: {
      location: true,
    },
  })
}

export async function getAllLocations() {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.locationsList())

  return db.query.locationsTable.findMany({
    orderBy: (fields) => [asc(fields.name)],
  })
}

export async function getEventById(id: SelectEvent['id']) {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.event(id))

  return db.query.eventsTable.findFirst({
    where: eq(eventsTable.id, id),
    with: { location: true },
  })
}

export async function getEventAttendanceStats(eventId: SelectEvent['id']) {
  'use cache'
  cacheLife('hours')
  cacheTag(cacheTags.attendance(), cacheTags.eventAttendance(eventId))

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
        sql`case when ${attendanceRecordsTable.status} in (${AttendanceStatus.TARDANZA}, ${AttendanceStatus.TARDANZA_JUSTIFICADA}) then 1 end`
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

async function getUpcomingEventsForDate(peruDate: string) {
  'use cache'
  cacheLife('minutes')
  cacheTag(cacheTags.eventsList())

  return db.query.eventsTable.findMany({
    where: sql`${eventsTable.date} >= ${peruDate}::date`,
    orderBy: (fields) => [fields.date],
    with: {
      location: true,
    },
    limit: 12,
  })
}

export const getUpcomingEvents = (now: Date) =>
  getUpcomingEventsForDate(getPeruDateKey(now))

export const getTodayEvents = async (now = new Date()) => {
  const peruNow = new TZDate(now.getTime(), 'America/Lima')
  const startOfToday = new TZDate(
    peruNow.getFullYear(),
    peruNow.getMonth(),
    peruNow.getDate(),
    'America/Lima'
  )
  const startOfTomorrow = new TZDate(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)

  return db.query.eventsTable.findMany({
    where: (fields) =>
      sql`${gte(fields.date, startOfToday)} AND ${lt(fields.date, startOfTomorrow)}`,
    orderBy: (fields) => [asc(fields.date), asc(fields.id)],
    with: { location: true },
  })
}

export const getEventForAttendance = async (id: SelectEvent['id']) =>
  db.query.eventsTable.findFirst({
    where: eq(eventsTable.id, id),
  })

export const getAttendanceRecordForUserEvent = async (
  userId: SelectUser['id'],
  eventId: SelectEvent['id']
) =>
  db.query.attendanceRecordsTable.findFirst({
    where: sql`${attendanceRecordsTable.userId} = ${userId} AND ${attendanceRecordsTable.eventId} = ${eventId}`,
    with: { user: true, registeredByUser: true },
  })

/* MassesTable */
export async function getPendingMasses() {
  'use cache'
  cacheLife('hours')
  cacheTag(cacheTags.masses(), cacheTags.massesList(), cacheTags.usersList())

  return db.query.sundayMassesTable.findMany({
    columns: {
      id: true,
      parish: true,
      sundayDate: true,
      createdAt: true,
      evidenceFileKey: true,
    },
    where: eq(sundayMassesTable.status, SundayMassStatus.PENDING),
    orderBy: (fields) => [asc(fields.createdAt), asc(fields.id)],
    with: {
      user: { columns: { firstName: true, lastName: true, category: true } },
    },
  })
}

export type PendingMassRecord = Awaited<
  ReturnType<typeof getPendingMasses>
>[number]

export async function getAllMasses() {
  'use cache'
  cacheLife('hours')
  cacheTag(cacheTags.masses(), cacheTags.massesList(), cacheTags.usersList())

  return db.query.sundayMassesTable.findMany({
    orderBy: (fields) => [desc(fields.id)],
    with: {
      user: true,
      verifier: true,
    },
  })
}

export async function getSundayMassesRecordsByUserId(
  userId: SelectUser['id'],
  limit: number | null = 100
) {
  'use cache'
  cacheLife('hours')
  cacheTag(
    cacheTags.masses(),
    cacheTags.userMasses(userId),
    cacheTags.usersList()
  )

  return db.query.sundayMassesTable.findMany({
    where: eq(sundayMassesTable.userId, userId),
    orderBy: (fields) => [desc(fields.sundayDate), desc(fields.id)],
    with: {
      user: true,
      verifier: true,
    },
    limit: limit ?? undefined,
  })
}
