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
    <>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>Eventos</h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver la lista de eventos.
        </p>
      </div>
      <EventsGrid />
    </>
  )
}
