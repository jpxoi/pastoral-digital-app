import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { countAllUsers, getEventAttendanceStats } from '@/queries/select'
import {
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconUsers,
} from '@tabler/icons-react'

export default async function EventDashboardCards({
  eventId,
}: {
  eventId: number
}) {
  const totalExpected = await countAllUsers()
  const {
    totalOnTime,
    totalLate,
    totalLateJustified,
    totalAbsentees,
    totalAbsenteesJustified,
  } = await getEventAttendanceStats(eventId)

  return (
    <div className='grid w-full gap-2 text-left sm:grid-cols-2 lg:grid-cols-4'>
      <Card className='border-slate-700 bg-slate-50 text-slate-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Catequistas</CardTitle>
          <IconUsers className='size-4 text-slate-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalExpected}</div>
          <p className='text-xs'>registrados en el evento</p>
        </CardContent>
      </Card>
      <Card className='border-green-700 bg-green-50 text-green-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total A Tiempo</CardTitle>
          <IconClockCheck className='size-4 text-green-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalOnTime}</div>
          <p className='text-xs'>
            {totalOnTime > 0
              ? `${((totalOnTime / totalExpected) * 100).toFixed(2)}%`
              : '0%'}
          </p>
        </CardContent>
      </Card>
      <Card className='border-yellow-700 bg-yellow-50 text-yellow-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Tardanzas</CardTitle>
          <IconClockExclamation className='size-4 text-yellow-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalLate}</div>
          <p className='text-xs'>
            {totalLateJustified > 0
              ? `${totalLateJustified} ${totalLateJustified === 1 ? 'tardanza justificada' : 'tardanzas justificadas'}`
              : 'ninguna tardanza justificada'}
          </p>
        </CardContent>
      </Card>
      <Card className='border-red-700 bg-red-50 text-red-900'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Ausentes</CardTitle>
          <IconCalendarX className='size-4 text-red-700' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalAbsentees}</div>
          <p className='text-xs'>
            {totalAbsenteesJustified > 0
              ? `${totalAbsenteesJustified} ${totalAbsenteesJustified === 1 ? 'falta justificada' : 'faltas justificadas'}`
              : 'ninguna falta justificada'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
