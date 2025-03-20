import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import AttendanceTable from '@/components/admin/attendanceTable'
import { Suspense } from 'react'
import AttendanceTableSkeleton from '@/components/admin/attendanceTableSkeleton'

export default async function Page() {
  return (
    <main className='container mx-auto p-4 md:p-8'>
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