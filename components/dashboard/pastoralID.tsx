import { PastoralIdCard } from './pastoral-id-card'
import { currentUser } from '@clerk/nextjs/server'
import PastoralIDSkeleton from './pastoralIDSkeleton'
import { getUserSchedule } from '@/queries/select'
import { UserSchedule } from '@/types'

export default async function PastoralId() {
  const user = await currentUser()

  if (!user) {
    return <PastoralIDSkeleton />
  }

  const userSchedule = (await getUserSchedule(user.id)) as {
    schedule: UserSchedule | null
  }

  return (
    <PastoralIdCard
      userId={user.id}
      name={
        [user.firstName?.trim().split(/\s+/)[0], user.lastName]
          .filter(Boolean)
          .join(' ') || 'Catequista'
      }
      schedule={userSchedule?.schedule ?? UserSchedule.FULL_TIME}
    />
  )
}
