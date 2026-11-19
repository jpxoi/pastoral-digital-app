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
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Registro de Asistencia
          </h1>
          <p className='text-sm text-neutral-500'>
            Aquí puedes ver los registros de asistencia de los catequistas.
          </p>
        </div>
        <RevalidateButton tag='attendance' />
      </div>
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceTable />
      </Suspense>
    </>
  )
}
