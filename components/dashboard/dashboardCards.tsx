import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserAttendanceStats } from '@/queries/select'
import { auth } from '@clerk/nextjs/server'
import {
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
} from '@tabler/icons-react'

export default async function DashboardCards() {
  const { userId } = await auth()
  const { totalOnTime, totalLate, totalAbsences } =
    await getUserAttendanceStats(userId as string)

  return (
    <div className='grid w-full gap-2 text-left lg:grid-cols-3'>
      <Card className='border-green-700 bg-green-50 text-green-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Asistencias Registradas
          </CardTitle>
          <IconClockCheck className='size-4 text-green-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalOnTime}</div>
        </CardContent>
      </Card>
      <Card className='border-yellow-700 bg-yellow-50 text-yellow-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Tardanzas Registradas
          </CardTitle>
          <IconClockExclamation className='size-4 text-yellow-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalLate}</div>
        </CardContent>
      </Card>
      <Card className='border-red-700 bg-red-50 text-red-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Faltas Registradas
          </CardTitle>
          <IconCalendarX className='size-4 text-red-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalAbsences}</div>
        </CardContent>
      </Card>
    </div>
  )
}
