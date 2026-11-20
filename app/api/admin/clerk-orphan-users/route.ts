import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { usersTable } from '@/db/schema'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

const requestSchema = z
  .object({
    userIds: z.array(z.string().min(1).max(128)).min(1).max(500),
    confirmation: z.literal('ELIMINAR'),
  })
  .strict()

async function authorize() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Inicia sesión para continuar.' },
      { status: 401 }
    )
  }
  if (!(await checkPermission(Permission.CLERK_ORPHAN_USERS_DELETE))) {
    return NextResponse.json(
      { error: 'No tienes permiso para limpiar usuarios de Clerk.' },
      { status: 403 }
    )
  }
  return null
}

async function listClerkUsers() {
  const client = await clerkClient()
  const limit = 500
  const firstPage = await client.users.getUserList({ limit })
  const users = [...firstPage.data]
  let startingAfter = users[users.length - 1]?.id

  while (users.length < firstPage.totalCount && startingAfter) {
    const page = await client.users.getUserList({ limit, startingAfter })
    users.push(...page.data)
    if (page.data.length < limit) break
    startingAfter = page.data[page.data.length - 1]?.id
  }

  return users
}

async function listOrphanUsers() {
  const [databaseUsers, clerkUsers] = await Promise.all([
    db.select({ id: usersTable.id }).from(usersTable),
    listClerkUsers(),
  ])
  const databaseIds = new Set(databaseUsers.map(({ id }) => id))

  return clerkUsers
    .filter(({ id }) => !databaseIds.has(id))
    .map((user) => ({
      id: user.id,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email:
        user.emailAddresses.find(({ id }) => id === user.primaryEmailAddressId)
          ?.emailAddress ?? '',
    }))
}

export async function GET() {
  const authorizationError = await authorize()
  if (authorizationError) return authorizationError

  try {
    const users = await listOrphanUsers()
    return NextResponse.json(
      { users },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Could not list Clerk users missing from the database', error)
    return NextResponse.json(
      { error: 'No se pudo consultar Clerk y la base de datos.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const authorizationError = await authorize()
  if (authorizationError) return authorizationError

  const parsed = requestSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'La solicitud no es válida.' },
      { status: 400 }
    )
  }

  const requestedIds = [...new Set(parsed.data.userIds)]
  if (requestedIds.length !== parsed.data.userIds.length) {
    return NextResponse.json(
      {
        error:
          'La lista contiene usuarios repetidos. Actualiza la vista previa.',
      },
      { status: 400 }
    )
  }

  try {
    const currentOrphans = await listOrphanUsers()
    const currentIds = new Set(currentOrphans.map(({ id }) => id))
    if (requestedIds.some((id) => !currentIds.has(id))) {
      return NextResponse.json(
        {
          error:
            'La lista cambió desde la vista previa. Actualízala antes de eliminar.',
        },
        { status: 409 }
      )
    }

    const client = await clerkClient()
    const deleted: string[] = []
    for (const id of requestedIds) {
      await client.users.deleteUser(id)
      deleted.push(id)
    }

    return NextResponse.json({ deletedIds: deleted })
  } catch (error) {
    console.error('Could not delete orphan Clerk users', error)
    return NextResponse.json(
      { error: 'No se pudo completar la limpieza de usuarios de Clerk.' },
      { status: 500 }
    )
  }
}
