import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import AttendanceTable from '@/components/admin/attendanceTable'
import { Suspense } from 'react'
import AttendanceTableSkeleton from '@/components/admin/attendanceTableSkeleton'
import { Metadata } from 'next'
import RevalidateButton from '@/components/shared/revalidateButton'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Registro de Asistencias | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.ATTENDANCE_VIEW_RECORDS)

  return (
    <>
      <PageHeader
        breadcrumb={<PageBreadcrumb label='Registro de Asistencia' />}
      />
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable>
          <RevalidateButton resource='records' />
        </AttendanceTable>
      </Suspense>
    </>
  )
}
