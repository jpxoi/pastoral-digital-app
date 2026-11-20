import { db } from '@/db/drizzle'
import { and, asc, eq, gte, lt, sql } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import {
  catechistAssignmentsTable,
  catechistCommunityAssignmentsTable,
  communitiesTable,
  programsTable,
  usersTable,
  attendanceRecordsTable,
  eventsTable,
} from '@/db/schema'
import type { AssignmentInput } from '@/types/assignments'
import { validateAssignments } from '@/lib/assignments'
import { cacheLife, cacheTag } from 'next/cache'
import { cacheTags } from '@/lib/cache'
import { TZDate } from '@date-fns/tz'
import type { TurnAssignment } from '@/lib/assignments'

export const assignmentRelations = {
  program: true,
  communityAssignment: { with: { community: true } },
} as const

export async function getUserAssignments(userId: string) {
  'use cache'
  cacheLife('hours')
  cacheTag(cacheTags.usersList(), cacheTags.userAssignments(userId))

  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, userId),
    columns: { id: true, firstName: true, lastName: true },
    with: { catechistAssignments: { with: assignmentRelations } },
  })
}

export async function getAssignmentCatalog() {
  'use cache'
  cacheLife('days')
  cacheTag(cacheTags.assignmentCatalog())

  return queryAssignmentCatalog()
}

async function queryAssignmentCatalog() {
  const rows = await db.query.programsTable.findMany({
    columns: { id: true, code: true, name: true },
    with: {
      communities: {
        columns: { id: true, programId: true, name: true },
        orderBy: [asc(communitiesTable.name)],
      },
    },
    orderBy: [asc(programsTable.code)],
  })

  return {
    programs: rows.map(({ id, code, name }) => ({ id, code, name })),
    communities: rows.flatMap((program) => program.communities),
  }
}

// Fresh context for QR registration: all decisions use the same database snapshot.
export async function getQrAttendanceContext(eventId: string, userId: string) {
  const now = new TZDate(new Date(), 'America/Lima')
  const start = new TZDate(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    'America/Lima'
  )
  const end = new TZDate(start)
  end.setDate(end.getDate() + 1)

  const [context] = await db
    .select({
      event: {
        id: eventsTable.id,
        date: eventsTable.date,
        secondTurnDate: eventsTable.secondTurnDate,
        endDate: eventsTable.endDate,
      },
      userId: usersTable.id,
      existingRecordId: attendanceRecordsTable.id,
      assignments: sql<TurnAssignment[]>`
        coalesce(
          jsonb_agg(jsonb_build_object(
            'type', ${catechistAssignmentsTable.type},
            'program', jsonb_build_object('code', ${programsTable.code})
          )) FILTER (WHERE ${catechistAssignmentsTable.id} IS NOT NULL),
          '[]'::jsonb
        )
      `,
    })
    .from(eventsTable)
    .leftJoin(usersTable, eq(usersTable.id, userId))
    .leftJoin(
      catechistAssignmentsTable,
      eq(catechistAssignmentsTable.userId, usersTable.id)
    )
    .leftJoin(
      programsTable,
      eq(programsTable.id, catechistAssignmentsTable.programId)
    )
    .leftJoin(
      attendanceRecordsTable,
      and(
        eq(attendanceRecordsTable.userId, usersTable.id),
        eq(attendanceRecordsTable.eventId, eventsTable.id)
      )
    )
    .where(
      and(
        eq(eventsTable.id, eventId),
        gte(eventsTable.date, start),
        lt(eventsTable.date, end)
      )
    )
    .groupBy(eventsTable.id, usersTable.id, attendanceRecordsTable.id)

  return context
}

export async function replaceUserAssignments(
  userId: string,
  assignments: AssignmentInput[]
) {
  // Validate writes against the current catalog rather than a cached copy.
  const catalog = await queryAssignmentCatalog()
  const error = validateAssignments(assignments, catalog)
  if (error) throw new Error(error)
  const rows = assignments.map((a) => ({
    id: randomUUID(),
    userId,
    type: a.type,
    programId: a.programId,
  }))
  const communityRows = assignments.flatMap((a, i) =>
    a.communityId && a.responsibility
      ? [
          {
            assignmentId: rows[i].id,
            communityId: a.communityId,
            responsibility: a.responsibility,
          },
        ]
      : []
  )
  // Neon HTTP batch executes one transaction. Serialize changes to the same
  // catechist so concurrent saves cannot exceed the two-assignment limit.
  const lock = db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .for('update')
  const remove = db
    .delete(catechistAssignmentsTable)
    .where(eq(catechistAssignmentsTable.userId, userId))
  const result = !rows.length
    ? await db.batch([lock, remove])
    : !communityRows.length
      ? await db.batch([
          lock,
          remove,
          db.insert(catechistAssignmentsTable).values(rows),
        ])
      : await db.batch([
          lock,
          remove,
          db.insert(catechistAssignmentsTable).values(rows),
          db.insert(catechistCommunityAssignmentsTable).values(communityRows),
        ])

  if (!result[0].length) {
    throw new Error('No se encontró al catequista.')
  }
}
