import { checkRole } from '@/lib/roles'
import { getTodayEvent } from '@/queries/select'
import { UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/upstash'

const CACHE_KEY = 'today-event'
const CACHE_EXPIRATION = 60 * 60 * 12 // 12 hours in seconds

export async function GET(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      { status: 401 }
    )
  }

  if (!(await checkRole(UserRole.ADMIN))) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden',
      },
      { status: 403 }
    )
  }

  // Check cache first
  const cachedEvent = await redis.get(CACHE_KEY)
  if (cachedEvent) {
    console.log(JSON.stringify(cachedEvent))
    if (
      JSON.stringify(cachedEvent) ===
      '{"error":"No hay ningún evento programado para hoy."}'
    ) {
      return NextResponse.json(
        {
          error: 'No hay ningún evento programado para hoy.',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: 'Evento del día obtenido correctamente.',
        event: cachedEvent,
        cached: true,
      },
      { status: 200 }
    )
  }

  // If not in cache, fetch from database
  return await getTodayEvent()
    .then(async (event) => {
      if (!event) {
        await redis.set(
          CACHE_KEY,
          { error: 'No hay ningún evento programado para hoy.' },
          { ex: CACHE_EXPIRATION }
        )
        return NextResponse.json(
          {
            error: 'No hay ningún evento programado para hoy.',
          },
          { status: 404 }
        )
      }

      // Store in cache for 24 hours
      await redis.set(CACHE_KEY, event, { ex: CACHE_EXPIRATION })

      return NextResponse.json(
        {
          success: 'Evento del día obtenido correctamente.',
          event: event,
          cached: false,
        },
        { status: 200 }
      )
    })
    .catch((error) => {
      console.error(error)
      return NextResponse.json(
        {
          error: 'Ha ocurrido un error al obtener el evento del día.',
        },
        { status: 500 }
      )
    })
}
