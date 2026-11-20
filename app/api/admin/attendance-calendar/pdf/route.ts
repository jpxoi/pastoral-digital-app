import { auth } from '@clerk/nextjs/server'
import { desc, eq, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { attendanceRecordsTable, eventsTable, usersTable } from '@/db/schema'
import {
  generateAttendanceCalendarPdf,
  type AttendanceCalendarPdfPerson,
} from '@/lib/attendance-calendar-pdf'
import { buildAttendanceReportFilename } from '@/lib/pdf-filenames'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Inicia sesión para exportar el calendario.' },
      { status: 401 }
    )
  }

  if (!(await checkPermission(Permission.ATTENDANCE_EXPORT_CALENDAR_PDF))) {
    return NextResponse.json(
      { error: 'No tienes permiso para exportar el calendario.' },
      { status: 403 }
    )
  }

  try {
    // Keep the last event of each day, matching the calendar's date-based cells.
    const dateKey = sql<string>`to_char(${eventsTable.date}, 'YYYY-MM-DD')`

    const calendarEvents = db.$with('calendar_events').as(
      db
        .selectDistinctOn([dateKey], {
          id: eventsTable.id,
          dateKey: dateKey.as('date_key'),
        })
        .from(eventsTable)
        .where(sql`${eventsTable.date}::date <= current_date`)
        .orderBy(dateKey, desc(eventsTable.date), desc(eventsTable.id))
    )

    const calendarDates = db.$with('calendar_dates').as(
      db
        .select({
          dateKeys: sql<string[]>`coalesce(
          jsonb_agg(${calendarEvents.dateKey} order by ${calendarEvents.dateKey}),
          '[]'::jsonb
        )`.as('date_keys'),
        })
        .from(calendarEvents)
    )

    const attendanceByUser = db.$with('attendance_by_user').as(
      db
        .select({
          userId: attendanceRecordsTable.userId,
          attendance: sql<Record<string, string | null>>`jsonb_object_agg(
          ${calendarEvents.dateKey}, ${attendanceRecordsTable.status}
        )`.as('attendance'),
        })
        .from(attendanceRecordsTable)
        .innerJoin(
          calendarEvents,
          eq(attendanceRecordsTable.eventId, calendarEvents.id)
        )
        .groupBy(attendanceRecordsTable.userId)
    )

    const reportPeople = db.$with('report_people').as(
      db
        .select({
          people: sql<
            AttendanceCalendarPdfPerson[]
          >`coalesce(jsonb_agg(jsonb_build_object(
          'userId', ${usersTable.id},
          'fullName', trim(${usersTable.firstName} || ' ' || ${usersTable.lastName}),
          'category', ${usersTable.category},
          'studentCode', ${usersTable.studentCode},
          'attendance', coalesce(${attendanceByUser.attendance}, '{}'::jsonb)
        )), '[]'::jsonb)`.as('people'),
        })
        .from(usersTable)
        .leftJoin(attendanceByUser, eq(usersTable.id, attendanceByUser.userId))
    )
    // Return shared calendar dates once, alongside the aggregated people.
    const [report] = await db
      .with(calendarEvents, calendarDates, attendanceByUser, reportPeople)
      .select({ people: reportPeople.people, dateKeys: calendarDates.dateKeys })
      .from(reportPeople)
      .crossJoin(calendarDates)

    const people = report?.people ?? []
    const dateKeys = report?.dateKeys ?? []
    if (people.length === 0 || dateKeys.length === 0) {
      return NextResponse.json(
        { error: 'No hay asistencias para exportar.' },
        { status: 404 }
      )
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
    const generatedAt = `Generado el ${generatedDate} a las ${generatedTime}`
    const pdf = await generateAttendanceCalendarPdf(
      people,
      dateKeys,
      generatedAt
    )

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${buildAttendanceReportFilename('attendanceCatechesis', now)}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Could not generate attendance calendar PDF', error)
    return NextResponse.json(
      { error: 'No se pudo exportar el calendario. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
