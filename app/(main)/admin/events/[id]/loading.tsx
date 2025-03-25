import EventAttendeesTableSkeleton from '@/components/events/eventAttendeesTableSkeleton'
import EventDashboardCardsSkeleton from '@/components/events/eventDashboardCardsSkeleton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/events'>Eventos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cargando...</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex flex-col gap-4 text-left'>
        <div className='flex justify-between gap-2 max-sm:flex-col'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-8 w-64' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-9 w-32' />
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col items-start justify-start gap-4'>
        <EventDashboardCardsSkeleton />
        <div className='flex w-full flex-col gap-4 text-left lg:grid lg:grid-cols-3'>
          <div className='flex flex-col gap-2 lg:col-span-2'>
            <h3 className='text-lg font-bold'>Registros</h3>

            <EventAttendeesTableSkeleton />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>Justificaciones</h3>
            <EventAttendeesTableSkeleton />
          </div>
        </div>
      </div>
    </main>
  )
}
