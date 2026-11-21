import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'

export default function Loading() {
  return (
    <>
      <PageHeader
        breadcrumb={<PageBreadcrumb label='Calendario de Asistencia' />}
      />
      <AttendanceCalendarTableSkeleton />
    </>
  )
}
