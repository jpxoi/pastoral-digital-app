import ErrorAlert from '@/components/shared/errorAlert'
import OfflineAlert from '@/components/shared/offlineAlert'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getEventById } from '@/queries/select'
import EventDashboardCards from '@/components/events/eventDashboardCards'
import { Suspense } from 'react'
import EventDashboardCardsSkeleton from '@/components/events/eventDashboardCardsSkeleton'
import EventJustifiedRecordsTable from '@/components/events/eventJustifiedRecordsTable'
import EventAttendeesTable from '@/components/events/eventAttendeesTable'
import EventAttendeesTableSkeleton from '@/components/events/eventAttendeesTableSkeleton'
import EventPageActionButtons from '@/components/events/eventPageActionButtons'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const event = await getEventById(id)

  if (!event) {
    return (
      <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
        <ErrorAlert
          title='Evento no encontrado'
          description={`No se encontró ningún evento con el ID ${id}. Por favor verifica el ID y vuelve a intentarlo.`}
        />
      </main>
    )
  }

  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <OfflineAlert />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/events'>Eventos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {event.name || 'Nombre del evento no disponible'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex flex-col gap-4 text-left'>
        <div className='flex justify-between gap-2 max-sm:flex-col'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-semibold sm:text-2xl'>{event.name}</h1>
          </div>
          <EventPageActionButtons eventId={id} />
        </div>
      </div>

      <div className='flex w-full flex-col items-start justify-start gap-4'>
        <Suspense fallback={<EventDashboardCardsSkeleton />}>
          <EventDashboardCards eventId={id} />
        </Suspense>

        <div className='flex w-full flex-col gap-4 text-left lg:grid lg:grid-cols-3'>
          <div className='flex flex-col gap-2 lg:col-span-2'>
            <h3 className='text-lg font-bold'>Registros</h3>
            <Suspense fallback={<EventAttendeesTableSkeleton />}>
              <EventAttendeesTable eventId={id} />
            </Suspense>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Justificaciones</h3>
            <Suspense fallback={<EventAttendeesTableSkeleton />}>
              <EventJustifiedRecordsTable eventId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
