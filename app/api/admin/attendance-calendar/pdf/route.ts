import { auth } from '@clerk/nextjs/server'
import { asc, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { attendanceRecordsTable, eventsTable, usersTable } from '@/db/schema'
import { generateAttendanceCalendarPdf } from '@/lib/attendance-calendar-pdf'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const runtime = 'nodejs'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Inicia sesión para exportar el calendario.' },
      { status: 401 }
    )
  }

  if (!(await checkPermission(Permission.ATTENDANCE_VIEW_CALENDAR))) {
    return NextResponse.json(
      { error: 'No tienes permiso para exportar el calendario.' },
      { status: 403 }
    )
  }

  try {
    const records = await db
      .select({
        userId: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        category: usersTable.category,
        studentCode: usersTable.studentCode,
        eventDate: eventsTable.date,
        status: attendanceRecordsTable.status,
      })
      .from(usersTable)
      .leftJoin(eventsTable, sql`1=1`)
      .leftJoin(
        attendanceRecordsTable,
        sql`${attendanceRecordsTable.userId} = ${usersTable.id} AND ${attendanceRecordsTable.eventId} = ${eventsTable.id}`
      )
      .where(
        sql`${eventsTable.date} IS NOT NULL AND ${eventsTable.date}::date <= current_date::date`
      )
      .orderBy(asc(eventsTable.date))

    const peopleById = new Map<
      string,
      {
        fullName: string
        category: (typeof records)[number]['category']
        studentCode: string | null
        attendance: Record<string, string | null>
      }
    >()
    const dateKeys = new Set<string>()

    for (const record of records) {
      if (!peopleById.has(record.userId)) {
        peopleById.set(record.userId, {
          fullName: `${record.firstName} ${record.lastName}`.trim(),
          category: record.category,
          studentCode: record.studentCode,
          attendance: {},
        })
      }

      if (record.eventDate) {
        const dateKey = new Date(record.eventDate).toISOString().split('T')[0]
        dateKeys.add(dateKey)
        peopleById.get(record.userId)!.attendance[dateKey] = record.status
      }
    }

    if (peopleById.size === 0) {
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
      Array.from(peopleById.values()),
      Array.from(dateKeys).sort(),
      generatedAt
    )

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="reporte-asistencia-catequesis.pdf"',
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
