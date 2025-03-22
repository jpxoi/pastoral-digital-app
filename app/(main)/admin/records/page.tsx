import AttendanceTable from '@/components/admin/attendanceTable'
import { Suspense } from 'react'
import AttendanceTableSkeleton from '@/components/admin/attendanceTableSkeleton'
import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'

export const metadata: Metadata = {
  title: 'Registros de Asistencia | Pastoral Digital App',
}

export default async function Page() {
  return (
    <main className='flex min-h-dvh h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10'>
      <OfflineAlert />
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Registro de Asistencia
        </h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver la lista de asistencia de los usuarios.
        </p>
      </div>
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable />
      </Suspense>
    </main>
  )
}

export const dynamic = 'force-dynamic'
