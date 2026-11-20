import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'

export default function Loading() {
  return (
    <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Mis asistencias' />} />
      <AttendanceTableSkeleton />
    </div>
  )
}
