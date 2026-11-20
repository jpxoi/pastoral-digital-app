import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'

export default function Loading() {
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader />
      <AttendanceTableSkeleton />
    </div>
  )
}
