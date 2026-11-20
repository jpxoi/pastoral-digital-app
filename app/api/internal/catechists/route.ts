import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import {
  authorizeInternalRequest,
  invalidPaginationResponse,
  jsonResponse,
  parsePagination,
} from '@/lib/internal-api'
import { asc, count, sql } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const unauthorized = authorizeInternalRequest(request)
  if (unauthorized) return unauthorized

  const pagination = parsePagination(request.nextUrl.searchParams)
  if (!pagination.success) {
    return invalidPaginationResponse(pagination.error.issues)
  }

  const { limit, offset } = pagination.data

  try {
    const totalQuery = db
      .select({ total: count().as('total') })
      .from(usersTable)
      .as('total_count')

    const pageQuery = db
      .select({
        userId: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        category: usersTable.category,
        assignments: sql`
          coalesce((
            SELECT jsonb_agg(jsonb_build_object(
              'id', assignment.id,
              'type', assignment.type,
              'programId', assignment.program_id,
              'program', CASE WHEN program.id IS NOT NULL THEN jsonb_build_object(
                'id', program.id, 'code', program.code, 'name', program.name
              ) END,
              'community', CASE WHEN community.id IS NOT NULL THEN jsonb_build_object(
                'id', community.id, 'name', community.name,
                'responsibility', membership.responsibility
              ) END
            ) ORDER BY assignment.type, program.code)
            FROM catechist_assignments assignment
            LEFT JOIN programs program ON program.id = assignment.program_id
            LEFT JOIN catechist_community_assignments membership
              ON membership.assignment_id = assignment.id
            LEFT JOIN communities community ON community.id = membership.community_id
            WHERE assignment.user_id = ${usersTable.id}
          ), '[]'::jsonb)
        `.as('assignments'),
      })
      .from(usersTable)
      .orderBy(
        asc(usersTable.firstName),
        asc(usersTable.lastName),
        asc(usersTable.id)
      )
      .limit(limit)
      .offset(offset)
      .as('catechists_page')

    const result = await db
      .select({
        total: totalQuery.total,
        catechist: {
          userId: pageQuery.userId,
          firstName: pageQuery.firstName,
          lastName: pageQuery.lastName,
          email: pageQuery.email,
          category: pageQuery.category,
          assignments: pageQuery.assignments,
        },
      })
      .from(totalQuery)
      .leftJoin(pageQuery, sql`true`)
      .orderBy(
        asc(pageQuery.firstName),
        asc(pageQuery.lastName),
        asc(pageQuery.userId)
      )

    const total = result[0]?.total ?? 0
    const data = result.flatMap(({ catechist }) =>
      catechist ? [catechist] : []
    )

    return jsonResponse({
      success: true,
      data,
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + data.length < total,
      },
    })
  } catch (error) {
    console.error('Error fetching catechists for internal API:', error)
    return jsonResponse(
      { success: false, error: 'Failed to fetch catechists' },
      500
    )
  }
}
