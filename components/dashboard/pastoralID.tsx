import { PastoralIdCard } from './pastoral-id-card'
import { currentUser } from '@clerk/nextjs/server'
import PastoralIDSkeleton from './pastoralIDSkeleton'
import { getUserAssignments } from '@/queries/assignments'

export default async function PastoralId() {
  const user = await currentUser()

  if (!user) {
    return <PastoralIDSkeleton />
  }

  const assignmentUser = await getUserAssignments(user.id)

  return (
    <PastoralIdCard
      userId={user.id}
      name={
        [user.firstName?.trim().split(/\s+/)[0], user.lastName]
          .filter(Boolean)
          .join(' ') || 'Catequista'
      }
      assignments={assignmentUser?.catechistAssignments ?? []}
    />
  )
}
