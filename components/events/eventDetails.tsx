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
import EventSummaryCard from '@/components/events/eventSummaryCard'
import { connection } from 'next/server'

export default async function EventDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await connection()
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
            <EventSummaryCard event={event} />
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
