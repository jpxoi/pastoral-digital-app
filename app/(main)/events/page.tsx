import { Metadata } from 'next'
import EventsGrid from '@/components/events/eventsGrid'

export const metadata: Metadata = {
  title: 'Eventos | Pastoral Digital App',
}

export default function Page() {
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
