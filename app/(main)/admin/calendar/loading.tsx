import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Calendario de Asistencia
          </h1>
        </div>
        <Skeleton className='h-9 w-full sm:w-32' />
      </div>
      <AttendanceCalendarTableSkeleton />
    </main>
  )
}
