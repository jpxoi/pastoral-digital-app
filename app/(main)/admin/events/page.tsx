import AdminEventsTableSkeleton from '@/components/admin/adminEventsTableSkeleton'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import { Suspense } from 'react'
import AdminEventsTable from '@/components/admin/adminEventsTable'
import EventCreateAction from '@/components/admin/eventCreateAction'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Administrar eventos',
}

export default async function Page() {
  const canCreateEvents = await checkPermission(Permission.EVENTS_CREATE)
  const canEditEvents = await checkPermission(Permission.EVENTS_EDIT)
  if (!canCreateEvents && !canEditEvents) redirect('/dashboard')

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Eventos' />} />
      <Suspense fallback={<AdminEventsTableSkeleton />}>
        <AdminEventsTable canEditEvents={canEditEvents}>
          {canCreateEvents && (
            <Suspense fallback={<Skeleton className='h-8 w-36' />}>
              <EventCreateAction />
            </Suspense>
          )}
        </AdminEventsTable>
      </Suspense>
    </>
  )
}
