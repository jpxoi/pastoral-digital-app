import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import { Suspense } from 'react'
import AdminEventsTable from '@/components/admin/adminEventsTable'
import EventCreateAction from '@/components/admin/eventCreateAction'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Administrar eventos',
}

export default async function Page() {
  await requirePermission(Permission.EVENTS_MANAGE)

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Eventos' />} />
      <Suspense
        fallback={
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Cargando eventos…
          </p>
        }
      >
        <AdminEventsTable>
          <Suspense fallback={<Skeleton className='h-9 w-36' />}>
            <EventCreateAction />
          </Suspense>
        </AdminEventsTable>
      </Suspense>
    </>
  )
}
