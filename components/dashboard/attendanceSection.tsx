import { Suspense } from 'react'
import AttendanceTable from '@/components/dashboard/attendanceTable'
import { Card, CardHeader } from '@/components/ui/card'
import AttendanceTableSkeleton from './attendanceTableSkeleton'

export default function AttendanceSection() {
  return (
    <div className='container mx-auto flex h-auto max-w-[100vw] flex-col items-center justify-center'>
      <h1 className='mb-4 text-xl font-bold sm:text-2xl'>
        Registro de Asistencias
      </h1>
      <Card className='relative w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-h-[65vh]'>
        <Suspense fallback={<AttendanceTableSkeleton />}>
          <AttendanceTable />
        </Suspense>
      </Card>
      <p className='mt-4 w-full max-w-full text-sm text-gray-600 sm:max-w-screen-sm md:max-w-screen-md'>
        Las faltas no se registran en la tabla. No obstante, cualquier fecha sin
        registro válido, se considera falta.
      </p>
    </div>
  )
}
