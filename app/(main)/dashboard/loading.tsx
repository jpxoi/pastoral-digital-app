import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import DashboardCardsSkeleton from '@/components/dashboard/dashboardCardsSkeleton'
import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex w-full flex-col items-center justify-start gap-4'>
        <div className='flex w-full flex-col items-center justify-start gap-4'>
          <div className='flex w-full justify-between gap-2 text-left max-sm:flex-col'>
            <h1 className='text-xl font-semibold sm:text-2xl'>Inicio</h1>
            <Skeleton className='h-9 w-36 max-sm:w-full' />
          </div>

          {/* Attendance Section */}
          <div className='flex h-auto w-full flex-col items-center justify-start gap-4'>
            <DashboardCardsSkeleton />
            <div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
              <AttendanceTableSkeleton />
              <SundayMassTableSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
