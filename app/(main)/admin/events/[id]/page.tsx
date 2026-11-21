import { Suspense } from 'react'
import EventDetails from '@/components/events/eventDetails'
import EventDetailsSkeleton from '@/components/events/eventDetailsSkeleton'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission(Permission.ATTENDANCE_VIEW_RECORDS)

  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails params={params} />
    </Suspense>
  )
}
