import { EventDateTimeSkeleton } from './eventDateTime'
import { AdminEventBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import EventDashboardCardsSkeleton from './eventDashboardCardsSkeleton'
import EventAttendeesTableSkeleton from './eventAttendeesTableSkeleton'

export default function EventDetailsSkeleton() {
  return (
    <>
      <PageHeader
        breadcrumb={<AdminEventBreadcrumb label='Detalle del evento' />}
      />
      <div
        aria-hidden='true'
        className='flex w-full flex-wrap justify-end gap-2'
      >
        <Skeleton className='h-8 w-36' />
        <Skeleton className='h-8 w-32' />
      </div>
      <div className='flex w-full flex-col items-start gap-4'>
        <Card
          size='sm'
          className='w-full gap-3 text-left'
          role='status'
          aria-label='Cargando detalle del evento'
        >
          <span className='sr-only'>Cargando detalle del evento</span>
          <CardHeader className='gap-2'>
            <Skeleton className='h-6 w-64 max-w-full' />
            <div className='flex flex-col gap-1'>
              <EventDateTimeSkeleton size='default' />
              <div className='flex items-center gap-2'>
                <Skeleton className='size-4 shrink-0' />
                <Skeleton className='h-5 w-48 max-w-full' />
              </div>
            </div>
          </CardHeader>
        </Card>
        <EventDashboardCardsSkeleton />
        <div className='flex w-full flex-col gap-2 text-left'>
          <h3 className='text-lg font-bold'>Registros</h3>
          <EventAttendeesTableSkeleton />
        </div>
      </div>
    </>
  )
}
