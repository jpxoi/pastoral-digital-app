import { getPastEvents } from '@/queries/select'
import EventCard from './eventCard'
import EmptyEvents from './emptyEvents'

export default async function PastEvents() {
  const pastEvents = await getPastEvents()
  return (
    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3'>
      {pastEvents.length > 0 ? (
        pastEvents.map((record) => (
          <EventCard key={record.id} record={record} type='past' />
        ))
      ) : (
        <EmptyEvents
          title='No hay eventos pasados'
          description='Aún no hay eventos pasados en este momento. Por favor verifica más tarde.'
        />
      )}
    </div>
  )
}
