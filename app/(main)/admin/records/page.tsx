import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AttendanceTable from '@/components/admin/attendanceTable'
import { Suspense } from 'react'
import AttendanceTableSkeleton from '@/components/admin/attendanceTableSkeleton'

export default async function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10'>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Asistencia</CardTitle>
          <CardDescription>
            Asistencias registradas en las últimas 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<AttendanceTableSkeleton />}>
            <AttendanceTable />
          </Suspense>
        </CardContent>
        {/* <CardFooter className='flex justify-end'>
        </CardFooter> */}
      </Card>
    </main>
  )
}

export const dynamic = 'force-dynamic'
