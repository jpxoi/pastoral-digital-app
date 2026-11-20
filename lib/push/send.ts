import 'server-only'
import { sendNotification } from 'web-push'
import { eq, inArray, lt, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { pushDeliveriesTable, pushSubscriptionsTable } from '@/db/schema'
import type { PushMessage } from './payloads'
import { buildPushDeliveryReservation } from '@/queries/push'

export type PushSubscriptionRecord = typeof pushSubscriptionsTable.$inferSelect
export type PushJob = {
  subscription: PushSubscriptionRecord
  key: string
  message: PushMessage
  ttl: number
}

export function pushIsConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY &&
    process.env.VAPID_PRIVATE_KEY &&
    process.env.VAPID_SUBJECT
  )
}

export async function sendPushBatch(jobs: PushJob[]) {
  if (!jobs.length) return { failed: 0 }
  if (!pushIsConfigured()) throw new Error('Web Push no está configurado.')
  const keyedJobs = jobs.map((job) => ({
    ...job,
    key: `${job.subscription.userId}:${job.key}`,
  }))
  // One INSERT…SELECT reserves the entire batch, verifies current ownership,
  // and discards duplicate deliveries. No per-device database requests.
  const claims = await buildPushDeliveryReservation(db, keyedJobs)
  const jobsByKey = new Map(
    keyedJobs.map((job) => [`${job.subscription.id}:${job.key}`, job])
  )
  const failedClaims: string[] = []
  const expiredSubscriptions = new Set<string>()

  // Batch HTTP calls too: never flood browser push services with an unbounded broadcast.
  for (let offset = 0; offset < claims.length; offset += 10) {
    await Promise.all(
      claims.slice(offset, offset + 10).map(async (claim) => {
        const job = jobsByKey.get(`${claim.subscriptionId}:${claim.key}`)!
        try {
          await sendNotification(
            {
              endpoint: job.subscription.endpoint,
              keys: {
                p256dh: job.subscription.p256dh,
                auth: job.subscription.auth,
              },
            },
            JSON.stringify(job.message),
            {
              TTL: job.ttl,
              timeout: 10_000,
              vapidDetails: {
                subject: process.env.VAPID_SUBJECT!,
                publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
                privateKey: process.env.VAPID_PRIVATE_KEY!,
              },
            }
          )
        } catch (error) {
          const status =
            typeof error === 'object' && error !== null && 'statusCode' in error
              ? error.statusCode
              : undefined
          if (status === 404 || status === 410)
            expiredSubscriptions.add(claim.subscriptionId)
          else {
            failedClaims.push(claim.id)
            // The original error may contain private endpoints and keys.
            console.error('Falló la entrega de Web Push', { status })
          }
        }
      })
    )
  }

  // At most two cleanup queries, only when failures occur; successes keep their claims.
  await Promise.all([
    expiredSubscriptions.size
      ? db
          .delete(pushSubscriptionsTable)
          .where(inArray(pushSubscriptionsTable.id, [...expiredSubscriptions]))
      : Promise.resolve(),
    failedClaims.length
      ? db
          .delete(pushDeliveriesTable)
          .where(inArray(pushDeliveriesTable.id, failedClaims))
      : Promise.resolve(),
  ])
  return { failed: failedClaims.length }
}

export async function sendUserPush(
  userId: string,
  key: string,
  message: PushMessage,
  ttl = 3600
) {
  if (!pushIsConfigured()) return { failed: 0 }
  const subscriptions = await db
    .select()
    .from(pushSubscriptionsTable)
    .where(eq(pushSubscriptionsTable.userId, userId))
  return sendPushBatch(
    subscriptions.map((subscription) => ({ subscription, key, message, ttl }))
  )
}

export async function prunePushDeliveries() {
  await db
    .delete(pushDeliveriesTable)
    .where(lt(pushDeliveriesTable.createdAt, sql`now() - interval '90 days'`))
}
