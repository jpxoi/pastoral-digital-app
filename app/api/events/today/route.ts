import { logger } from '@/lib/logger'
import { checkPermission } from '@/lib/roles'
import { getTodayEvents } from '@/queries/select'
import { Permission } from '@/types/permissions'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 }
    )
  }

  if (!(await checkPermission(Permission.EVENTS_VIEW_TODAY))) {
    return NextResponse.json(
      {
        error: 'Forbidden',
      },
      { status: 403 }
    )
  }

  return await getTodayEvents()
    .then((events) => {
      return NextResponse.json(events, { status: 200 })
    })
    .catch((error) => {
      logger.error('Failed to fetch today events', { userId, error })
      return NextResponse.json(
        {
          error: 'Ha ocurrido un error al obtener el evento del día.',
        },
        { status: 500 }
      )
    })
}
