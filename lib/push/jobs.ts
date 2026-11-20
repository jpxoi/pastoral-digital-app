import type { pushSubscriptionsTable } from '@/db/schema'
import type { PushMessage } from './payloads'

export type PushSubscriptionRecord = typeof pushSubscriptionsTable.$inferSelect
export type PushJob = {
  subscription: PushSubscriptionRecord
  key: string
  message: PushMessage
  ttl: number
}
export type UserPushMessage = {
  userId: string
  key: string
  message: PushMessage
  ttl?: number
}

export function buildUserPushJobs(
  subscriptions: PushSubscriptionRecord[],
  messages: UserPushMessage[]
): PushJob[] {
  const messagesByUser = new Map<string, UserPushMessage[]>()
  for (const message of messages) {
    const userMessages = messagesByUser.get(message.userId) ?? []
    userMessages.push(message)
    messagesByUser.set(message.userId, userMessages)
  }
  return subscriptions.flatMap((subscription) =>
    (messagesByUser.get(subscription.userId) ?? []).map((message) => ({
      subscription,
      key: message.key,
      message: message.message,
      ttl: message.ttl ?? 3600,
    }))
  )
}
