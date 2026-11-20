import { Suspense } from 'react'
import type { Metadata } from 'next'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'

export const metadata: Metadata = {
  title: 'Mis asistencias | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.DASHBOARD_VIEW)
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Mis asistencias' />} />
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable preview={false} />
      </Suspense>
    </div>
  )
}
