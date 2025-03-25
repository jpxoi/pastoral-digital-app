import { getPastEvents } from '@/queries/select'
import EventCard from './eventCard'

export default async function PastEvents() {
  const pastEvents = await getPastEvents()
  return (
    <>
      {pastEvents.length > 0 ? (
        pastEvents.map((record) => (
          <EventCard key={record.id} record={record} type='past' />
        ))
      ) : (
        <div className='flex items-center justify-start text-neutral-500'>
          <p>No hay eventos pasados</p>
        </div>
      )}
    </>
  )
}
