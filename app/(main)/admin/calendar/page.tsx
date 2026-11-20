import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import AttendanceCalendarTable from '@/components/admin/attendanceCalendarTable'
import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import ExportAttendanceCalendarPdfButton from '@/components/admin/exportAttendanceCalendarPdfButton'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Calendario de Asistencias | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.ATTENDANCE_VIEW_CALENDAR)

  return (
    <>
      <PageHeader
        breadcrumb={<PageBreadcrumb label='Calendario de Asistencia' />}
      />
      <Suspense fallback={<AttendanceCalendarTableSkeleton />}>
        <AttendanceCalendarTable>
          <div className='flex items-center gap-2'>
            <RevalidateButton resource='calendar' />
            <ExportAttendanceCalendarPdfButton />
          </div>
        </AttendanceCalendarTable>
      </Suspense>
    </>
  )
}
