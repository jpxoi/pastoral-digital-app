import { Suspense } from 'react'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import AttendanceTableSkeleton from './attendanceTableSkeleton'
import DashboardCards from './dashboardCards'
import DashboardCardsSkeleton from './dashboardCardsSkeleton'
import SundayMassTable from './sundayMassTable'
import SundayMassTableSkeleton from './sundayMassTableSkeleton'

export default function AttendanceSection() {
  return (
    <div className='flex h-auto w-full flex-col items-center justify-start gap-4'>
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <DashboardCards />
      </Suspense>
      <div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
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
