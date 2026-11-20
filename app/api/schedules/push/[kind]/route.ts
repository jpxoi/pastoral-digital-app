import { logger } from '@/lib/logger'
import { timingSafeEqual } from 'node:crypto'
import { TZDate } from '@date-fns/tz'
import { jsonResponse } from '@/lib/internal-api'
import { pushIsConfigured } from '@/lib/push/send'
import { sendScheduledPush, type ScheduledPushKind } from '@/lib/push/scheduled'

const scheduleHours = { events: 18, masses: 17, birthdays: 9 } as const

export async function POST(
  request: Request,
  context: { params: Promise<{ kind: string }> }
) {
  const secret = process.env.CRON_SECRET
  const provided = Buffer.from(request.headers.get('authorization') ?? '')
  const expected = Buffer.from(`Bearer ${secret}`)
  if (
    !secret ||
    secret.length < 16 ||
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return jsonResponse({ error: 'No autorizado.' }, 401)
  }
  const { kind } = await context.params
  if (!Object.hasOwn(scheduleHours, kind))
    return jsonResponse({ error: 'Schedule desconocido.' }, 404)
  if (!pushIsConfigured())
    return jsonResponse({ error: 'Web Push no está configurado.' }, 503)

  // Use the scheduled instant, not the delivery time affected by jitter.
  const scheduledAt = new Date(request.headers.get('ce-vssscheduledat') ?? '')
  const peruTime = new TZDate(scheduledAt.getTime(), 'America/Lima')
  const age = Date.now() - scheduledAt.getTime()
  if (
    !Number.isFinite(age) ||
    age < -60_000 ||
    age > 30 * 60_000 ||
    peruTime.getHours() !== scheduleHours[kind as ScheduledPushKind] ||
    peruTime.getMinutes() !== 0 ||
    (kind === 'masses' && peruTime.getDay() !== 0) ||
    (kind === 'events' && ![5, 6].includes(peruTime.getDay()))
  ) {
    return jsonResponse(
      { error: 'Ejecución fuera del horario previsto o demasiado antigua.' },
      400
    )
  }

  try {
    const result = await sendScheduledPush(
      kind as ScheduledPushKind,
      scheduledAt
    )
    return jsonResponse(result, result.failed ? 503 : 200)
  } catch {
    logger.error('Falló el schedule de notificaciones', { kind })
    return jsonResponse({ error: 'No se pudo completar el envío.' }, 503)
  }
}
