import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import AttendanceCalendarTable from '@/components/admin/attendanceCalendarTable'
import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import ExportAttendanceCalendarPdfButton from '@/components/admin/exportAttendanceCalendarPdfButton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageActions from '@/components/shared/pageActions'

export const metadata: Metadata = {
  title: 'Calendario de asistencias',
}

export default async function Page() {
  await requirePermission(Permission.ATTENDANCE_VIEW_CALENDAR)
  const canExportPdf = await checkPermission(
    Permission.ATTENDANCE_EXPORT_CALENDAR_PDF
  )

  return (
    <>
      <PageHeader
        breadcrumb={<PageBreadcrumb label='Calendario de Asistencia' />}
      />
      <Suspense
        fallback={<AttendanceCalendarTableSkeleton canExport={canExportPdf} />}
      >
        <AttendanceCalendarTable>
          <PageActions>
            <RevalidateButton resource='calendar' />
            {canExportPdf && <ExportAttendanceCalendarPdfButton />}
          </PageActions>
        </AttendanceCalendarTable>
      </Suspense>
    </>
  )
}
