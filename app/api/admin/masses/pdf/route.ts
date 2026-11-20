import { auth } from '@clerk/nextjs/server'
import { eq, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { sundayMassesTable, usersTable } from '@/db/schema'
import { generateAttendanceCalendarPdf } from '@/lib/attendance-calendar-pdf'
import { buildAttendanceReportFilename } from '@/lib/pdf-filenames'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import { AttendanceStatus, SundayMassStatus } from '@/types'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Inicia sesión para exportar el reporte de misas.' },
      { status: 401 }
    )
  }

  if (!(await checkPermission(Permission.MASSES_VIEW_RECORDS))) {
    return NextResponse.json(
      { error: 'No tienes permiso para exportar el reporte de misas.' },
      { status: 403 }
    )
  }

  try {
    const people = await db
      .select({
        userId: usersTable.id,
        fullName: sql<string>`trim(${usersTable.firstName} || ' ' || ${usersTable.lastName})`,
        category: usersTable.category,
        studentCode: usersTable.studentCode,
        attendance: sql<Record<string, string | null>>`coalesce(
          jsonb_object_agg(
            ${sundayMassesTable.sundayDate}::text,
            case when ${sundayMassesTable.status} = ${SundayMassStatus.ACCEPTED}
              then ${AttendanceStatus.A_TIEMPO}::text else null end
          ) filter (where ${sundayMassesTable.id} is not null),
          '{}'::jsonb
        )`,
        firstSunday: sql<
          string | null
        >`min(min(${sundayMassesTable.sundayDate})) over ()`,
        lastSunday: sql<
          string | null
        >`max(max(${sundayMassesTable.sundayDate})) over ()`,
      })
      .from(usersTable)
      .leftJoin(sundayMassesTable, eq(usersTable.id, sundayMassesTable.userId))
      .groupBy(usersTable.id)

    const firstDate = people[0]?.firstSunday
    const lastDate = people[0]?.lastSunday
    if (!firstDate || !lastDate) {
      return NextResponse.json(
        { error: 'No hay registros de misas para exportar.' },
        { status: 404 }
      )
    }

    const firstSunday = new Date(`${firstDate}T00:00:00.000Z`)
    const lastSunday = new Date(`${lastDate}T00:00:00.000Z`)
    const dateKeys: string[] = []
    for (
      const date = firstSunday;
      date <= lastSunday;
      date.setUTCDate(date.getUTCDate() + 7)
    ) {
      dateKeys.push(date.toISOString().slice(0, 10))
    }

    const now = new Date()
    const generatedDate = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      dateStyle: 'short',
    }).format(now)
    const generatedTime = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: '2-digit',
      minute: '2-digit',
    }).format(now)
    const pdf = await generateAttendanceCalendarPdf(
      people,
      dateKeys,
      `Generado el ${generatedDate} a las ${generatedTime}`,
      'REPORTE DE ASISTENCIA A MISA'
    )

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${buildAttendanceReportFilename('attendanceMasses', now)}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Could not generate Sunday masses PDF', error)
    return NextResponse.json(
      { error: 'No se pudo exportar el reporte de misas. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
