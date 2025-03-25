import { getUpcomingEvents } from '@/queries/select'
import EventCard from './eventCard'

export default async function UpcomingEvents() {
  const upcomingEvents = await getUpcomingEvents()
  return (
    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3'>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((record) => (
          <EventCard key={record.id} record={record} type='upcoming' />
        ))
      ) : (
        <div className='flex items-center justify-start text-neutral-500'>
          <p>No hay eventos programados en los próximos días</p>
        </div>
      )}
    </div>
  )
}
