import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { pushSubscriptionsTable } from '@/db/schema'
import { jsonResponse } from '@/lib/internal-api'
import { pushIsConfigured } from '@/lib/push/send'
import {
  pushEndpointSchema,
  pushSubscriptionSchema,
} from '@/lib/push/subscription'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return jsonResponse({ error: 'No autorizado.' }, 401)
  if (!pushIsConfigured())
    return jsonResponse({ configured: false, endpoints: [] })
  try {
    const subscriptions = await db
      .select({ endpoint: pushSubscriptionsTable.endpoint })
      .from(pushSubscriptionsTable)
      .where(eq(pushSubscriptionsTable.userId, userId))
    return jsonResponse({
      configured: true,
      endpoints: subscriptions.map((s) => s.endpoint),
    })
  } catch {
    return jsonResponse(
      { error: 'No se pudo consultar el estado de las notificaciones.' },
      503
    )
  }
}

async function authorizeMutation(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return { error: jsonResponse({ error: 'Origen no permitido.' }, 403) }
  }
  const { userId } = await auth()
  if (!userId) return { error: jsonResponse({ error: 'No autorizado.' }, 401) }
  return { userId }
}

export async function POST(request: Request) {
  const authorization = await authorizeMutation(request)
  if (authorization.error) return authorization.error
  if (!pushIsConfigured())
    return jsonResponse({ error: 'Notificaciones no disponibles.' }, 503)
  const body = await request.text()
  if (body.length > 8192)
    return jsonResponse({ error: 'Solicitud demasiado grande.' }, 413)
  let input: unknown
  try {
    input = JSON.parse(body)
  } catch {
    return jsonResponse({ error: 'Solicitud inválida.' }, 400)
  }
  const parsed = pushSubscriptionSchema.safeParse(input)
  if (!parsed.success)
    return jsonResponse({ error: 'Suscripción inválida.' }, 400)
  try {
    const { endpoint, keys } = parsed.data
    await db
      .insert(pushSubscriptionsTable)
      .values({
        userId: authorization.userId!,
        endpoint,
        ...keys,
      })
      .onConflictDoUpdate({
        target: pushSubscriptionsTable.endpoint,
        set: { userId: authorization.userId!, ...keys, updatedAt: new Date() },
      })
    return jsonResponse({ success: true })
  } catch {
    return jsonResponse(
      { error: 'No se pudieron activar las notificaciones.' },
      503
    )
  }
}

export async function DELETE(request: Request) {
  const authorization = await authorizeMutation(request)
  if (authorization.error) return authorization.error
  const body = await request.json().catch(() => null)
  const parsed = pushEndpointSchema.safeParse(body?.endpoint)
  if (!parsed.success)
    return jsonResponse({ error: 'Suscripción inválida.' }, 400)
  try {
    await db
      .delete(pushSubscriptionsTable)
      .where(
        and(
          eq(pushSubscriptionsTable.endpoint, parsed.data),
          eq(pushSubscriptionsTable.userId, authorization.userId!)
        )
      )
    return jsonResponse({ success: true })
  } catch {
    return jsonResponse(
      { error: 'No se pudieron desactivar las notificaciones.' },
      503
    )
  }
}
