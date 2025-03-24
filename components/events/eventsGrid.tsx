import { getPastEvents, getUpcomingEvents } from '@/queries/select'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default async function EventsGrid() {
  const pastEvents = await getPastEvents()
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <div className='grid gap-2 lg:col-span-2 lg:grid-cols-2'>
        <h2 className='col-span-full text-lg'>Próximos eventos</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((record) => (
            <Card key={record.id} className='text-left'>
              <CardHeader>
                <CardTitle className='text-lg'>{record.name}</CardTitle>
                <CardDescription>
                  {record.date.toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-neutral-500'>No hay registros de asistencia.</p>
          </div>
        )}
      </div>
      <div className='grid gap-2'>
        <h2 className='col-span-full text-lg'>Eventos pasados</h2>
        {pastEvents.length > 0 ? (
          pastEvents.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <CardTitle className='text-lg'>{record.name}</CardTitle>
                <CardDescription>
                  {record.date.toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </CardDescription>
              </CardHeader>
            </Card>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <p className='text-neutral-500'>No hay registros de asistencia.</p>
          </div>
        )}
      </div>
    </div>
  )
}
