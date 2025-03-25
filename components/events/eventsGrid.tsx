import { Suspense } from 'react'
import PastEvents from './pastEvents'
import UpcomingEvents from './upcomingEvents'
import EventCardGroupSkeleton from './eventCardGroupSkeleton'

export default function EventsGrid() {
  return (
    <div className='grid gap-4 text-left md:grid-cols-2 xl:grid-cols-3'>
      <div className='flex flex-col gap-2 xl:col-span-2'>
        <div className='grid gap-2 xl:grid-cols-2'>
          <h2 className='col-span-full text-lg font-medium'>
            Próximos eventos
          </h2>
          <Suspense fallback={<EventCardGroupSkeleton count={6} />}>
            <UpcomingEvents />
          </Suspense>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='grid gap-2'>
          <h2 className='col-span-full text-lg font-medium'>Eventos pasados</h2>
          <Suspense fallback={<EventCardGroupSkeleton count={3} />}>
            <PastEvents />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
