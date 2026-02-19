import ErrorAlert from '@/components/shared/errorAlert'
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
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const event = await getEventById(id)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/events'>Eventos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event ? event.name : id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {event ? (
        <>
          <div className='flex flex-col gap-4 text-left'>
            <div className='flex justify-between gap-2 max-sm:flex-col'>
              <div className='flex flex-col gap-0.5'>
                <h1 className='text-xl font-semibold sm:text-2xl'>
                  {event.name}
                </h1>
                <p className='text-sm text-neutral-500'>
                  {format(new Date(event.date), 'PPPPpp', {
                    locale: es,
                    in: tz('America/Lima'),
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
        </>
      ) : (
        <ErrorAlert
          title='Evento no encontrado'
          description={`No se encontró ningún evento con el ID ${id}. Por favor verifica el ID y vuelve a intentarlo.`}
        />
      )}
    </>
  )
}
