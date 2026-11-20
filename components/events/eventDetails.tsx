import PageHeader from '@/components/shared/pageHeader'
import ErrorAlert from '@/components/shared/errorAlert'
import { AdminEventBreadcrumb } from '@/components/shared/breadcrumbTrail'
import { getEventById } from '@/queries/select'
import EventDashboardCards from '@/components/events/eventDashboardCards'
import { Suspense } from 'react'
import EventDashboardCardsSkeleton from '@/components/events/eventDashboardCardsSkeleton'
import EventAttendeesTable from '@/components/events/eventAttendeesTable'
import EventAttendeesTableSkeleton from '@/components/events/eventAttendeesTableSkeleton'
import EventPageActionButtons from '@/components/events/eventPageActionButtons'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconCalendar, IconMapPin } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'

export default async function EventDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(id)

  return (
    <>
      {event ? (
        <>
          <PageHeader
            breadcrumb={<AdminEventBreadcrumb label={event.name} />}
          />
          <EventPageActionButtons eventId={id} />
          <div className='flex w-full flex-col items-start justify-start gap-4'>
            <Card size='sm' className='w-full gap-3 text-left'>
              <CardHeader className='gap-2'>
                <CardTitle className='text-base font-semibold group-data-[size=sm]/card:text-base'>
                  {event.name}
                </CardTitle>
                <CardDescription className='flex flex-col gap-1 text-sm'>
                  <span className='flex items-center gap-2'>
                    <IconCalendar className='size-4 shrink-0' />
                    <span>
                      {format(new Date(event.date), 'PPP', {
                        locale: es,
                        in: tz('America/Lima'),
                      })}{' '}
                      ·{' '}
                      {format(new Date(event.date), 'p', {
                        locale: es,
                        in: tz('America/Lima'),
                      })}{' '}
                      -{' '}
                      {format(new Date(event.endDate), 'p', {
                        locale: es,
                        in: tz('America/Lima'),
                      })}
                    </span>
                  </span>
                  {event.location && (
                    <a
                      href={event.location.googleMapsUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='text-muted-foreground hover:text-primary flex items-start gap-2 hover:underline'
                    >
                      <IconMapPin className='mt-0.5 size-4 shrink-0' />
                      <span>{event.location.name}</span>
                    </a>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
            <Suspense fallback={<EventDashboardCardsSkeleton />}>
              <EventDashboardCards eventId={id} />
            </Suspense>

            <div className='flex w-full flex-col gap-2 text-left'>
              <h3 className='text-lg font-bold'>Registros</h3>
              <Suspense fallback={<EventAttendeesTableSkeleton />}>
                <EventAttendeesTable eventId={id} />
              </Suspense>
            </div>
          </div>
        </>
      ) : (
        <>
          <PageHeader
            breadcrumb={<AdminEventBreadcrumb label={'Evento no encontrado'} />}
          />
          <ErrorAlert
            title='Evento no encontrado'
            description={`No se encontró ningún evento con el ID ${id}. Por favor verifica el ID y vuelve a intentarlo.`}
          />
        </>
      )}
    </>
  )
}
