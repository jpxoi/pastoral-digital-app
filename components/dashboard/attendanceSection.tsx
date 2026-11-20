import { Suspense } from 'react'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import AttendanceTableSkeleton from './attendanceTableSkeleton'
import DashboardCards from './dashboardCards'
import DashboardCardsSkeleton from './dashboardCardsSkeleton'
import SundayMassTable from './sundayMassTable'
import SundayMassTableSkeleton from './sundayMassTableSkeleton'

export default function AttendanceSection() {
  return (
    <div className='flex w-full flex-col gap-8'>
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <DashboardCards />
      </Suspense>
      <div className='grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-2'>
        <Suspense fallback={<AttendanceTableSkeleton />}>
          <AttendanceTable />
        </Suspense>
        <Suspense fallback={<SundayMassTableSkeleton />}>
          <SundayMassTable />
        </Suspense>
      </div>
    </div>
  )
}
