import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import { generateFotocheckPdf } from '@/lib/fotochecks/pdf'
import { buildFotocheckFilename } from '@/lib/pdf-filenames'
import { assignmentRelations } from '@/queries/assignments'

const requestSchema = z
  .object({ userId: z.string().min(1).max(128).optional() })
  .strict()

export async function POST(request: Request) {
  const { userId } = await auth()
  if (!userId)
    return NextResponse.json(
      { error: 'Inicia sesión para generar fotochecks.' },
      { status: 401 }
    )
  if (
    !(await checkPermission(Permission.CATECHISTS_VIEW)) ||
    !(await checkPermission(Permission.CATECHISTS_VIEW_PASTORAL_ID))
  ) {
    return NextResponse.json(
      { error: 'No tienes permiso para generar fotochecks.' },
      { status: 403 }
    )
  }
  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success)
    return NextResponse.json(
      { error: 'La solicitud no es válida.' },
      { status: 400 }
    )
  try {
    const records = await db.query.usersTable.findMany({
      columns: {
        id: true,
        firstName: true,
        lastName: true,
      },
      with: {
        catechistAssignments: { with: assignmentRelations },
      },
      where: parsed.data.userId
        ? eq(usersTable.id, parsed.data.userId)
        : undefined,
      orderBy: [
        asc(usersTable.lastName),
        asc(usersTable.firstName),
        asc(usersTable.id),
      ],
    })

    if (!records.length)
      return NextResponse.json(
        { error: 'No hay catequistas disponibles.' },
        { status: 404 }
      )
    const people = records.map((person) => ({
      id: person.id,
      name: `${person.firstName.trim().split(/\s+/)[0]} ${person.lastName}`
        .trim()
        .replace(/\s+/g, ' '),
      assignments: person.catechistAssignments,
    }))
    const logo = await readFile(
      path.join(process.cwd(), 'public/brand/optimized/logo-horizontal-600.png')
    )
    const buffer = await generateFotocheckPdf(people, logo)
    const filename = buildFotocheckFilename(
      parsed.data.userId ? people[0].name : undefined
    )
    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'X-Fotocheck-Count': String(people.length),
      },
    })
  } catch (error) {
    console.error('Could not generate fotocheck PDF', error)
    return NextResponse.json(
      { error: 'No se pudieron generar los fotochecks. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
