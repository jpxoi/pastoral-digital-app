import 'server-only'
import { and, asc, eq, gt, gte, lt, notExists, sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import {
  eventsTable,
  locationsTable,
  pushSubscriptionsTable,
  sundayMassesTable,
  usersTable,
} from '@/db/schema'
import { getPeruDateKey } from '@/lib/birthday'
import {
  birthdayMessagesForUser,
  eventReminder,
  getNextPeruDateKey,
  type PushMessage,
} from './payloads'
import { prunePushDeliveries, sendPushBatch } from './send'

export type ScheduledPushKind = 'events' | 'masses' | 'birthdays'

export async function sendScheduledPush(
  kind: ScheduledPushKind,
  scheduledAt: Date
) {
  const date = getPeruDateKey(scheduledAt)
  const tomorrow = new Date(`${getNextPeruDateKey(scheduledAt)}T00:00:00-05:00`)
  const events =
    kind === 'events'
      ? await db
          .select({
            id: eventsTable.id,
            name: eventsTable.name,
            date: eventsTable.date,
            location: locationsTable.name,
          })
          .from(eventsTable)
          .innerJoin(
            locationsTable,
            eq(eventsTable.locationId, locationsTable.id)
          )
          .where(
            and(
              gte(eventsTable.date, tomorrow),
              lt(eventsTable.date, new Date(tomorrow.getTime() + 86_400_000))
            )
          )
      : []
  const birthdays =
    kind === 'birthdays'
      ? await db
          .select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
          })
          .from(usersTable)
          .where(
            sql`to_char(${usersTable.dateOfBirth}, 'MM-DD') = ${date.slice(5)}`
          )
          .orderBy(
            asc(usersTable.firstName),
            asc(usersTable.lastName),
            asc(usersTable.id)
          )
      : []

  if (kind === 'birthdays') await prunePushDeliveries()
  if (
    (kind === 'events' && !events.length) ||
    (kind === 'birthdays' && !birthdays.length)
  ) {
    return { subscriptions: 0, failed: 0 }
  }
  const eventMessages = events.map(eventReminder)
  let cursor: string | undefined
  let failed = 0
  let subscriptions = 0

  // Two DB operations per page: fetch eligible devices, then reserve their deliveries.
  // User details and mass eligibility are fetched together, never one query per user.
  while (true) {
    const recipients = await db
      .select({
        subscription: pushSubscriptionsTable,
        user: { id: usersTable.id, firstName: usersTable.firstName },
      })
      .from(pushSubscriptionsTable)
      .innerJoin(usersTable, eq(pushSubscriptionsTable.userId, usersTable.id))
      .where(
        and(
          cursor ? gt(pushSubscriptionsTable.id, cursor) : undefined,
          kind === 'masses'
            ? notExists(
                db
                  .select({ id: sundayMassesTable.id })
                  .from(sundayMassesTable)
                  .where(
                    and(
                      eq(sundayMassesTable.userId, usersTable.id),
                      eq(sundayMassesTable.sundayDate, date)
                    )
                  )
              )
            : undefined
        )
      )
      .orderBy(asc(pushSubscriptionsTable.id))
      .limit(100)
    if (!recipients.length) break

    const jobs = recipients.flatMap(({ subscription, user }) => {
      let messages: PushMessage[]
      if (kind === 'events') messages = eventMessages
      else if (kind === 'birthdays')
        messages = birthdayMessagesForUser(user, birthdays, date)
      else
        messages = [
          {
            title: 'Recuerda registrar tu misa',
            body: 'Si ya asististe, sube tu evidencia. Tienes hasta mañana a las 12:00 p. m.',
            url: `/masses?register=1&sunday=${date}`,
            tag: `mass-reminder:${date}`,
          },
        ]
      return messages.map((message) => ({
        subscription,
        key: message.tag,
        message,
        ttl: kind === 'birthdays' ? 12 * 3600 : 6 * 3600,
      }))
    })
    const result = await sendPushBatch(jobs)
    failed += result.failed
    subscriptions += recipients.length
    if (recipients.length < 100) break
    cursor = recipients[recipients.length - 1].subscription.id
  }
  return { subscriptions, failed }
}
