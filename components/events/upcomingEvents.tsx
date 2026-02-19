import { getUpcomingEvents } from '@/queries/select'
import EventCard from './eventCard'
import EmptyEvents from './emptyEvents'

export default async function UpcomingEvents() {
  const upcomingEvents = await getUpcomingEvents()
  return (
    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3'>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((record) => (
          <EventCard key={record.id} record={record} type='upcoming' />
        ))
      ) : (
        <EmptyEvents />
      )}
    </div>
  )
}
