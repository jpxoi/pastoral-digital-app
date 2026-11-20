import { Skeleton } from '@/components/ui/skeleton'
import PageHeader from '@/components/shared/pageHeader'
import DashboardCardsSkeleton from '@/components/dashboard/dashboardCardsSkeleton'
import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'

export default function DashboardLoading() {
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader />
      <div className='w-full pb-2'>
        <Skeleton className='h-9 w-80 max-w-full' />
      </div>
      <div className='flex w-full flex-col gap-8'>
        <DashboardCardsSkeleton />
        <div className='grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-2'>
          <AttendanceTableSkeleton preview />
          <SundayMassTableSkeleton preview />
        </div>
      </div>
    </div>
  )
}
