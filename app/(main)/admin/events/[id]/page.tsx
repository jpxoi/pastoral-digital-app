import { AdminEventBreadcrumb } from '@/components/shared/breadcrumbTrail'
import { Suspense } from 'react'
import EventDetails from '@/components/events/eventDetails'
import EventDashboardCardsSkeleton from '@/components/events/eventDashboardCardsSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission(Permission.ATTENDANCE_VIEW_RECORDS)

  return (
    <Suspense
      fallback={
        <>
          <PageHeader
            breadcrumb={<AdminEventBreadcrumb label='Detalle del evento' />}
          />
          <EventDashboardCardsSkeleton />
        </>
      }
    >
      <EventDetails params={params} />
    </Suspense>
  )
}
