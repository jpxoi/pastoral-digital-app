import { db } from '@/db/drizzle'
import {
  attendanceRecordsTable,
  eventsTable,
  SelectEvent,
  SelectUser,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { redis } from '@/lib/upstash'
import { AttendanceStatus } from '@/types'
import { asc, between, count, desc, eq, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

const CACHE_DURATION = {
  HOUR: 3600,
  SIX_HOURS: 3600 * 6,
  TWELVE_HOURS: 3600 * 12,
  DAY: 3600 * 24,
  WEEK: 3600 * 24 * 7,
  MONTH: 3600 * 24 * 28,
}

/* UsersTable */
export const getAllUsers = unstable_cache(
  async () => {
    return db.query.usersTable.findMany({
      orderBy: (fields) => [
        sql`${fields.firstName} || ' ' || ${fields.lastName}`,
      ],
    })
  },
  ['getAllUsers'],
  {
    revalidate: CACHE_DURATION.MONTH,
    tags: ['users'],
  }
)

export const getUserById = unstable_cache(
  async (id: SelectUser['id']) => {
    return db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    })
  },
  ['getUserById'],
  {
    revalidate: CACHE_DURATION.MONTH,
  }
)

export const countAllUsers = unstable_cache(
  async () => {
    return db.$count(usersTable)
  },
  ['countAllUsers'],
  {
    revalidate: CACHE_DURATION.MONTH,
  }
)

export const getUserSchedule = async (userId: SelectUser['id']) => {
  const cacheKey = `user-schedule:${userId}`
  const cachedSchedule = await redis.get(cacheKey)

  if (cachedSchedule) {
    console.log('Cache hit for user schedule for userId:', userId)
    return {
      schedule: cachedSchedule as string,
    }
  }
  // If not in cache, fetch from database
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
    columns: {
      schedule: true,
    },
  })

  // Store the schedule in cache for 1 month
  if (user?.schedule) {
    await redis.set(cacheKey, user.schedule, { ex: CACHE_DURATION.MONTH })
  }

  console.log('Cache miss for user schedule for userId:', userId)
  return user
}

export const getUserBirthdays = unstable_cache(
  async () => {
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
  },
  ['getUserBirthdays'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['users'],
  }
)

export const getUserAttendanceStats = async (userId: SelectUser['id']) => {
  const cacheKey = `user-attendance-stats:${userId}`
  const cachedStats = (await redis.get(cacheKey)) as {
    totalOnTime: number
    totalLate: number
    totalAbsences: number
  } | null
  if (cachedStats) {
    console.log('Cache hit for user attendance stats for userId:', userId)
    return cachedStats
  }

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

  // Store the stats in cache for 1 week
  await redis.set(cacheKey, stats, { ex: CACHE_DURATION.WEEK })
  console.log('Cache miss for user attendance stats for userId:', userId)

  return stats
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

export const countUsersWithNoAttendanceRecord = unstable_cache(
  async (eventId: SelectEvent['id']) => {
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
  },
  ['countUsersWithNoAttendanceRecord'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

/* AttendanceRecordsTable */
export const getAllAttendanceRecords = unstable_cache(
  async () => {
    return db.query.attendanceRecordsTable.findMany({
      with: {
        user: true,
        event: true,
        registeredByUser: true,
      },
      orderBy: (fields) => [desc(fields.id), desc(fields.userId)],
    })
  },
  ['getAllAttendanceRecords'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

export const getLastAttendanceRecord = async () => {
  return db.query.attendanceRecordsTable.findFirst({
    orderBy: (fields) => [desc(fields.id)],
    with: {
      user: true,
      registeredByUser: true,
    },
  })
}

export const getAttendanceRecordsByUserId = unstable_cache(
  async (userId: SelectUser['id']) => {
    return db.query.attendanceRecordsTable.findMany({
      where: eq(attendanceRecordsTable.userId, userId),
      orderBy: (fields) => [desc(fields.id)],
      with: {
        user: true,
        event: true,
        registeredByUser: true,
      },
      limit: 100,
    })
  },
  ['getAttendanceRecordsByUserId'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

export const getAttendanceRecordsByEventId = unstable_cache(
  async (eventId: SelectEvent['id']) => {
    return db.query.attendanceRecordsTable.findMany({
      where: eq(attendanceRecordsTable.eventId, eventId),
      orderBy: (fields) => [desc(fields.id), desc(fields.userId)],
      with: {
        user: true,
        registeredByUser: true,
      },
      limit: 200,
    })
  },
  ['getAttendanceRecordsByEventId'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

export const getAttendanceCalendar = unstable_cache(
  async () => {
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
  },
  ['getAttendanceCalendar'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

/* EventsTable */
export const getAllEvents = unstable_cache(
  async () => {
    return db.query.eventsTable.findMany({
      orderBy: (fields) => [asc(fields.date)],
    })
  },
  ['getAllEvents'],
  {
    revalidate: CACHE_DURATION.SIX_HOURS,
  }
)

export const getEventById = unstable_cache(
  async (id: SelectEvent['id']) => {
    return db.query.eventsTable.findFirst({
      where: eq(eventsTable.id, id),
    })
  },
  ['getEventById'],
  {
    revalidate: CACHE_DURATION.MONTH,
  }
)

export const getEventAttendanceStats = unstable_cache(
  async (eventId: SelectEvent['id']) => {
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
  },
  ['getEventAttendanceStats'],
  {
    revalidate: CACHE_DURATION.DAY,
    tags: ['attendance'],
  }
)

export const getUpcomingEvents = unstable_cache(
  async () => {
    return db.query.eventsTable.findMany({
      where: sql`date >= current_date`,
      orderBy: (fields) => [fields.date],
      with: {
        location: true,
      },
      limit: 6, // Multiple of 6
    })
  },
  ['getUpcomingEvents'],
  {
    revalidate: CACHE_DURATION.SIX_HOURS,
    tags: ['events'],
  }
)

export const getPastEvents = unstable_cache(
  async () => {
    return db.query.eventsTable.findMany({
      where: sql`date < current_date`,
      orderBy: (fields) => [desc(fields.date)],
      with: {
        location: true,
      },
      limit: 24, // Multiple of 6
    })
  },
  ['getPastEvents'],
  {
    revalidate: CACHE_DURATION.SIX_HOURS,
    tags: ['events'],
  }
)

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
export const getAllMasses = unstable_cache(
  async () => {
    return db.query.sundayMassesTable.findMany({
      orderBy: (fields) => [desc(fields.id)],
      with: {
        user: true,
        verifier: true,
      },
    })
  },
  ['getAllMasses'],
  {
    revalidate: CACHE_DURATION.SIX_HOURS,
    tags: ['sundayMasses'],
  }
)

export const getSundayMassesRecordsByUserId = unstable_cache(
  async (userId: SelectUser['id']) => {
    return db.query.sundayMassesTable.findMany({
      where: eq(sundayMassesTable.userId, userId),
      orderBy: (fields) => [desc(fields.id)],
      with: {
        user: true,
        verifier: true,
      },
      limit: 100,
    })
  },
  ['getSundayMassesRecordsByUserId'],
  {
    revalidate: CACHE_DURATION.SIX_HOURS,
    tags: ['sundayMasses'],
  }
)
