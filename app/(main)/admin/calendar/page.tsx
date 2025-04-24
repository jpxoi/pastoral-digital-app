import { Suspense } from 'react'
import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import AttendanceCalendarTable from '@/components/admin/attendanceCalendarTable'
import AttendanceCalendarTableSkeleton from '@/components/admin/attendanceCalendarTableSkeleton'

export const metadata: Metadata = {
  title: 'Calendario de Asistencias | Pastoral Digital App',
}

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Calendario de Asistencia
        </h1>
      </div>

      <Suspense fallback={<AttendanceCalendarTableSkeleton />}>
        <AttendanceCalendarTable />
      </Suspense>
    </main>
  )
}
