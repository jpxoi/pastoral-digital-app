import { logger } from '@/lib/logger'
import 'server-only'
import { sendNotification } from 'web-push'
import { and, asc, gt, inArray, lt, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { pushDeliveriesTable, pushSubscriptionsTable } from '@/db/schema'
import type { PushMessage } from './payloads'
import { buildPushDeliveryReservation } from '@/queries/push'
import { buildUserPushJobs, type PushJob, type UserPushMessage } from './jobs'

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
            logger.error('Falló la entrega de Web Push', { status })
          }
        }
      })
    )
  }

  // Independent cleanup statements share one HTTP batch; successful claims stay reserved.
  const cleanups = [
    ...(expiredSubscriptions.size
      ? [
          db
            .delete(pushSubscriptionsTable)
            .where(
              inArray(pushSubscriptionsTable.id, [...expiredSubscriptions])
            ),
        ]
      : []),
    ...(failedClaims.length
      ? [
          db
            .delete(pushDeliveriesTable)
            .where(inArray(pushDeliveriesTable.id, failedClaims)),
        ]
      : []),
  ]
  const [firstCleanup, ...otherCleanups] = cleanups
  if (firstCleanup) await db.batch([firstCleanup, ...otherCleanups])
  return { failed: failedClaims.length }
}

export async function sendUserPush(
  userId: string,
  key: string,
  message: PushMessage,
  ttl = 3600
) {
  return sendUsersPush([{ userId, key, message, ttl }])
}

export async function sendUsersPush(messages: UserPushMessage[]) {
  if (!messages.length || !pushIsConfigured()) return { failed: 0 }
  const userIds = [...new Set(messages.map((message) => message.userId))]
  let cursor: string | undefined
  let failed = 0
  while (true) {
    const subscriptions = await db
      .select()
      .from(pushSubscriptionsTable)
      .where(
        and(
          inArray(pushSubscriptionsTable.userId, userIds),
          cursor ? gt(pushSubscriptionsTable.id, cursor) : undefined
        )
      )
      .orderBy(asc(pushSubscriptionsTable.id))
      .limit(100)
    if (!subscriptions.length) break
    failed += (await sendPushBatch(buildUserPushJobs(subscriptions, messages)))
      .failed
    if (subscriptions.length < 100) break
    cursor = subscriptions[subscriptions.length - 1].id
  }
  return { failed }
}

export function prunePushDeliveries() {
  return db
    .delete(pushDeliveriesTable)
    .where(lt(pushDeliveriesTable.createdAt, sql`now() - interval '90 days'`))
}
