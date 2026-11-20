import { Suspense } from 'react'
import type { Metadata } from 'next'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import AttendanceTableSkeleton from '@/components/dashboard/attendanceTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'

export const metadata: Metadata = {
  title: 'Mis asistencias',
}

export default async function Page() {
  await requirePermission(Permission.ATTENDANCE_VIEW_OWN)
  return (
    <div className='flex w-full flex-col gap-6'>
      <PageHeader />
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable preview={false} />
      </Suspense>
    </div>
  )
}
