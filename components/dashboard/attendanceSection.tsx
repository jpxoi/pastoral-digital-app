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
    </div>
  )
}
