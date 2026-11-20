import { logger } from '@/lib/logger'
import { db } from '@/db/drizzle'
import { eventsTable, locationsTable } from '@/db/schema'
import {
  authorizeInternalRequest,
  invalidPaginationResponse,
  jsonResponse,
  parsePagination,
} from '@/lib/internal-api'
import { asc, count, eq, sql } from 'drizzle-orm'
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
      .from(eventsTable)
      .as('total_count')

    const pageQuery = db
      .select({
        eventId: eventsTable.id,
        name: eventsTable.name,
        description: eventsTable.description,
        date: eventsTable.date,
        secondTurnDate: eventsTable.secondTurnDate,
        endDate: eventsTable.endDate,
        locationId: locationsTable.id,
        locationName: locationsTable.name,
        locationAddress: locationsTable.address,
        locationCity: locationsTable.city,
        locationPostalCode: locationsTable.postalCode,
        locationCountry: locationsTable.country,
        locationGoogleMapsUrl: locationsTable.googleMapsUrl,
      })
      .from(eventsTable)
      .innerJoin(locationsTable, eq(eventsTable.locationId, locationsTable.id))
      .orderBy(asc(eventsTable.date), asc(eventsTable.id))
      .limit(limit)
      .offset(offset)
      .as('events_page')

    const result = await db
      .select({
        total: totalQuery.total,
        event: {
          eventId: pageQuery.eventId,
          name: pageQuery.name,
          description: pageQuery.description,
          date: pageQuery.date,
          secondTurnDate: pageQuery.secondTurnDate,
          endDate: pageQuery.endDate,
          locationId: pageQuery.locationId,
          locationName: pageQuery.locationName,
          locationAddress: pageQuery.locationAddress,
          locationCity: pageQuery.locationCity,
          locationPostalCode: pageQuery.locationPostalCode,
          locationCountry: pageQuery.locationCountry,
          locationGoogleMapsUrl: pageQuery.locationGoogleMapsUrl,
        },
      })
      .from(totalQuery)
      .leftJoin(pageQuery, sql`true`)
      .orderBy(asc(pageQuery.date), asc(pageQuery.eventId))

    const total = result[0]?.total ?? 0
    const data = result.flatMap(({ event }) =>
      event
        ? [
            {
              eventId: event.eventId,
              name: event.name,
              description: event.description,
              date: event.date,
              secondTurnDate: event.secondTurnDate,
              endDate: event.endDate,
              location: {
                locationId: event.locationId,
                name: event.locationName,
                address: event.locationAddress,
                city: event.locationCity,
                postalCode: event.locationPostalCode,
                country: event.locationCountry,
                googleMapsUrl: event.locationGoogleMapsUrl,
              },
            },
          ]
        : []
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
    logger.error('Error fetching events for internal API:', { error })
    return jsonResponse(
      { success: false, error: 'Failed to fetch events' },
      500
    )
  }
}
