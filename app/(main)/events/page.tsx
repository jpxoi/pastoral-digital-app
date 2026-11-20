import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import EventsGrid from '@/components/events/eventsGrid'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Eventos | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.EVENTS_VIEW)

  return (
    <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Eventos' />} />
      <EventsGrid />
    </div>
  )
}
