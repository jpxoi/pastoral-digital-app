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
import EventAttendeesTable from '@/components/events/eventAttendeesTable'
import EventAttendeesTableSkeleton from '@/components/events/eventAttendeesTableSkeleton'
import EventPageActionButtons from '@/components/events/eventPageActionButtons'
import Link from 'next/link'

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
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/events'>Eventos</Link>
            </BreadcrumbLink>
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
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-xl font-semibold sm:text-2xl'>{event.name}</h1>
            <p className='text-sm text-neutral-500'>
              {event.date.toLocaleDateString('es-PE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Lima',
              })}
            </p>
          </div>
          <EventPageActionButtons eventId={id} />
        </div>
      </div>
      <div className='flex w-full flex-col items-start justify-start gap-4'>
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
    </main>
  )
}
