import { Suspense } from 'react'
import { Metadata } from 'next'
import AttendanceCalendarTable from '@/components/admin/attendanceCalendarTable'
import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Calendario de Asistencias | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.ATTENDANCE_VIEW_CALENDAR)

  return (
    <>
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Calendario de Asistencia
          </h1>
        </div>
        <RevalidateButton tag='attendance' />
      </div>

      <Suspense fallback={<AttendanceCalendarTableSkeleton />}>
        <AttendanceCalendarTable />
      </Suspense>
    </>
  )
}
