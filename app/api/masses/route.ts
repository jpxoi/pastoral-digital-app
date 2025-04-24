import { checkRole } from '@/lib/roles'
import { getAllMasses } from '@/queries/select'
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

  if (
    !(await checkRole(UserRole.ADMIN)) &&
    !(await checkRole(UserRole.MANAGER))
  ) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden',
      },
      { status: 403 }
    )
  }

  try {
    const massesData = await getAllMasses()

    if (massesData.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No masses records found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: massesData,
    })
  } catch (error) {
    console.error('Error fetching masses data:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch masses data',
      },
      { status: 500 }
    )
  }
}
