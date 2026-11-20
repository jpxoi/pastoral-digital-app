import { auth } from '@clerk/nextjs/server'
import { eq, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { sundayMassesTable, usersTable } from '@/db/schema'
import {
  generateAttendanceCalendarPdf,
  type AttendanceCalendarPdfPerson,
} from '@/lib/attendance-calendar-pdf'
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
    const attendanceByUser = db.$with('attendance_by_user').as(
      db
        .select({
          userId: usersTable.id,
          fullName:
            sql<string>`trim(${usersTable.firstName} || ' ' || ${usersTable.lastName})`.as(
              'full_name'
            ),
          category: usersTable.category,
          studentCode: usersTable.studentCode,
          // Unaccepted records render like missing cells, so omit them from the map.
          attendance: sql<Record<string, string | null>>`coalesce(
          jsonb_object_agg(${sundayMassesTable.sundayDate}::text, ${AttendanceStatus.A_TIEMPO}::text)
            filter (where ${sundayMassesTable.status} = ${SundayMassStatus.ACCEPTED}),
          '{}'::jsonb
        )`.as('attendance'),
          firstSunday: sql<
            string | null
          >`min(${sundayMassesTable.sundayDate})`.as('first_sunday'),
          lastSunday: sql<
            string | null
          >`max(${sundayMassesTable.sundayDate})`.as('last_sunday'),
        })
        .from(usersTable)
        .leftJoin(
          sundayMassesTable,
          eq(usersTable.id, sundayMassesTable.userId)
        )
        .groupBy(usersTable.id)
    )
    const [report] = await db
      .with(attendanceByUser)
      .select({
        people: sql<
          AttendanceCalendarPdfPerson[]
        >`coalesce(jsonb_agg(jsonb_build_object(
        'userId', ${attendanceByUser.userId},
        'fullName', ${attendanceByUser.fullName},
        'category', ${attendanceByUser.category},
        'studentCode', ${attendanceByUser.studentCode},
        'attendance', ${attendanceByUser.attendance}
      )), '[]'::jsonb)`,
        firstSunday: sql<string | null>`min(${attendanceByUser.firstSunday})`,
        lastSunday: sql<string | null>`max(${attendanceByUser.lastSunday})`,
      })
      .from(attendanceByUser)

    const people = report?.people ?? []
    const firstDate = report?.firstSunday
    const lastDate = report?.lastSunday
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
