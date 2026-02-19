import { Suspense } from 'react'
import { Metadata } from 'next'
import AttendanceCalendarTable from '@/components/admin/attendanceCalendarTable'
import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'

export const metadata: Metadata = {
  title: 'Calendario de Asistencias | Pastoral Digital App',
}

export default function Page() {
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
