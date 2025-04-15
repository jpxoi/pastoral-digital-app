import { getPastEvents } from '@/queries/select'
import EventCard from './eventCard'

export default async function PastEvents() {
  const pastEvents = await getPastEvents()
  return (
    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3'>
      {pastEvents.length > 0 ? (
        pastEvents.map((record) => (
          <EventCard key={record.id} record={record} type='past' />
        ))
      ) : (
        <div className='col-span-full flex items-center justify-start pt-4 text-muted-foreground'>
          <p className='text-sm'>
            No hay eventos en esta sección. Por favor verifica más tarde.
          </p>
        </div>
      )}
    </div>
  )
}
