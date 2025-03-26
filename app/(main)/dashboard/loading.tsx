import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import DashboardCardsSkeleton from '@/components/dashboard/dashboardCardsSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start md:justify-between'>
        {/* Pastoral ID */}
        <div className='pass-front group m-0 h-auto w-full min-w-80 rounded-lg p-0 transition-all duration-300 sm:min-w-96 sm:max-w-sm'>
          <div className='group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-[#001944] bg-white drop-shadow-md transition-all duration-300 hover:drop-shadow-2xl'>
            <div className='relative h-full w-full'>
              <Skeleton className='m-0 mx-auto aspect-square h-auto w-full items-center justify-center rounded-lg p-0 sm:max-w-sm' />
              <div className='flex h-full flex-col items-center justify-center bg-[#001944] p-2'>
                <p className='text-balance text-xs text-blue-50'>
                  Escanea este QR para registrar tu asistencia
                </p>
              </div>
            </div>
            <div className='z-5 absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine' />
          </div>
        </div>

        {/* Attendance Section */}
        <div className='flex h-auto w-full flex-col items-center justify-start gap-4'>
          <DashboardCardsSkeleton />
          <AttendanceTableSkeleton />
        </div>
      </div>
    </main>
  )
}
