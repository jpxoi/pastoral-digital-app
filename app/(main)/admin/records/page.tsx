import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AttendanceTable from '@/components/admin/attendanceTable'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

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
          <Suspense fallback={<Skeleton className='h-96 w-full bg-gray-100' />}>
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
