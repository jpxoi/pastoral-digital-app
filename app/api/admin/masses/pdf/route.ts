import { auth } from '@clerk/nextjs/server'
import { asc } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/db/drizzle'
import { sundayMassesTable, usersTable } from '@/db/schema'
import { generateAttendanceCalendarPdf } from '@/lib/attendance-calendar-pdf'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import { SundayMassStatus } from '@/types'

export const runtime = 'nodejs'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Inicia sesión para exportar el reporte de misas.' },
      { status: 401 }
    )
  }

  if (!(await checkPermission(Permission.MASSES_MANAGE))) {
    return NextResponse.json(
      { error: 'No tienes permiso para exportar el reporte de misas.' },
      { status: 403 }
    )
  }

  try {
    const [people, records] = await Promise.all([
      db
        .select({
          id: usersTable.id,
          firstName: usersTable.firstName,
          lastName: usersTable.lastName,
          category: usersTable.category,
          studentCode: usersTable.studentCode,
        })
        .from(usersTable)
        .orderBy(asc(usersTable.firstName), asc(usersTable.lastName)),
      db
        .select({
          userId: sundayMassesTable.userId,
          sundayDate: sundayMassesTable.sundayDate,
          status: sundayMassesTable.status,
        })
        .from(sundayMassesTable)
        .orderBy(asc(sundayMassesTable.sundayDate)),
    ])

    if (people.length === 0 || records.length === 0) {
      return NextResponse.json(
        { error: 'No hay registros de misas para exportar.' },
        { status: 404 }
      )
    }

    const firstSunday = new Date(`${records[0].sundayDate}T00:00:00.000Z`)
    const lastSunday = new Date(
      `${records[records.length - 1].sundayDate}T00:00:00.000Z`
    )
    const dateKeys: string[] = []
    for (
      const date = firstSunday;
      date <= lastSunday;
      date.setUTCDate(date.getUTCDate() + 7)
    ) {
      dateKeys.push(date.toISOString().slice(0, 10))
    }

    const peopleWithAttendance = people.map((person) => ({
      fullName: `${person.firstName} ${person.lastName}`.trim(),
      category: person.category,
      studentCode: person.studentCode,
      attendance: {} as Record<string, string | null>,
    }))
    const peopleById = new Map(
      people.map((person, index) => [person.id, peopleWithAttendance[index]])
    )

    for (const record of records) {
      const person = peopleById.get(record.userId)
      if (!person) continue
      person.attendance[record.sundayDate] =
        record.status === SundayMassStatus.ACCEPTED ? 'A TIEMPO' : null
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
      peopleWithAttendance,
      dateKeys,
      `Generado el ${generatedDate} a las ${generatedTime}`,
      'REPORTE DE ASISTENCIA A MISA'
    )

    return new Response(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="reporte-asistencia-misas.pdf"',
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
