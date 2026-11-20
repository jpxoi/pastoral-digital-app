import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'

export default function Loading() {
  return (
    <div className='flex w-full flex-col gap-6'>
      <PageHeader />
      <AttendanceTableSkeleton />
    </div>
  )
}
