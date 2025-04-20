import { checkRole } from '@/lib/roles'
import { getAllUsers } from '@/queries/select'
import { UserRole } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const eventIdParam = searchParams.get('eventId')
  const eventId = eventIdParam ? parseInt(eventIdParam, 10) : null

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

  try {
    const userData = await getAllUsers()

    if (userData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No users records found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: userData,
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user data',
      },
      { status: 500 }
    )
  }
}
