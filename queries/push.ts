import { sql } from 'drizzle-orm'
import type { db } from '@/db/drizzle'
import { pushDeliveriesTable, pushSubscriptionsTable } from '@/db/schema'

type DeliveryTarget = {
  subscription: { id: string; userId: string }
  key: string
}

export function buildPushDeliveryReservation(
  database: Pick<typeof db, 'insert' | 'select'>,
  targets: DeliveryTarget[]
) {
  const rows = sql`(values ${sql.join(
    targets.map(
      ({ subscription, key }) =>
        sql`(${subscription.id}::uuid, ${subscription.userId}, ${key})`
    ),
    sql`, `
  )}) as jobs(subscription_id, user_id, notification_key)`

  // The join verifies ownership and the unique constraint reserves each delivery
  // atomically, including when two scheduler invocations overlap.
  return database
    .insert(pushDeliveriesTable)
    .select(
      database
        .select({
          id: sql<string>`uuidv7()`.as('id'),
          subscriptionId: pushSubscriptionsTable.id,
          notificationKey: sql<string>`jobs.notification_key`.as(
            'notification_key'
          ),
          createdAt: sql<Date>`now()`.as('created_at'),
        })
        .from(pushSubscriptionsTable)
        .innerJoin(
          rows,
          sql`
      ${pushSubscriptionsTable.id} = jobs.subscription_id
      and ${pushSubscriptionsTable.userId} = jobs.user_id
    `
        )
        .where(sql`true`)
    )
    .onConflictDoNothing()
    .returning({
      id: pushDeliveriesTable.id,
      subscriptionId: pushDeliveriesTable.subscriptionId,
      key: pushDeliveriesTable.notificationKey,
    })
}
