import { auth } from '@clerk/nextjs/server'
import { PastoralIdCard } from './pastoral-id-card'
import PastoralIDSkeleton from './pastoralIDSkeleton'
import { getUserAssignments } from '@/queries/assignments'

export default async function PastoralId() {
  const { userId } = await auth()

  if (!userId) {
    return <PastoralIDSkeleton />
  }

  const assignmentUser = await getUserAssignments(userId)

  return (
    <PastoralIdCard
      userId={userId}
      name={
        [
          assignmentUser?.firstName?.trim().split(/\s+/)[0],
          assignmentUser?.lastName,
        ]
          .filter(Boolean)
          .join(' ') || 'Catequista'
      }
      assignments={assignmentUser?.catechistAssignments ?? []}
    />
  )
}
