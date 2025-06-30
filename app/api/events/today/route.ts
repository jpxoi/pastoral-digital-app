import { checkRole } from '@/lib/roles'
import { getTodayEvent } from '@/queries/select'
import { UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
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

  return await getTodayEvent()
    .then(async (event) => {
      if (!event) {
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
          event: event,
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
