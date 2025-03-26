import { Suspense } from 'react'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import AttendanceTableSkeleton from './attendanceTableSkeleton'
import DashboardCards from './dashboardCards'
import DashboardCardsSkeleton from './dashboardCardsSkeleton'

export default function AttendanceSection() {
  return (
    <div className='flex h-auto w-full flex-col items-center justify-start gap-4'>
      <Suspense fallback={<DashboardCardsSkeleton />}>
        <DashboardCards />
      </Suspense>
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable />
      </Suspense>
    </div>
  )
}
