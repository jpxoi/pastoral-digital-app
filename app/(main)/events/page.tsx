import { Metadata } from 'next'
import EventsGrid from '@/components/events/eventsGrid'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageHeader from '@/components/shared/pageHeader'

export const metadata: Metadata = {
  title: 'Eventos',
}

export default async function Page() {
  await requirePermission(Permission.EVENTS_VIEW)

  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader />
      <EventsGrid />
    </div>
  )
}
