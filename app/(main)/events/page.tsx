import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import EventsGrid from '@/components/events/eventsGrid'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Eventos | Pastoral Digital App',
}

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>Eventos</h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver la lista de eventos.
        </p>
      </div>
      <EventsGrid />
    </main>
  )
}
