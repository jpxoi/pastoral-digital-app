import type { ReactNode } from 'react'
import { getAttendanceCalendar } from '@/queries/select'
import { connection } from 'next/server'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from '@/components/ui/empty'
import { IconCalendarCancel } from '@tabler/icons-react'
import AttendanceCalendarClientTable from '@/components/admin/attendanceCalendarClientTable'

export default async function AttendanceCalendarTable({
  children,
}: {
  children?: ReactNode
}) {
  await connection()
  const attendanceCalendar = await getAttendanceCalendar(new Date())

  if (!attendanceCalendar || attendanceCalendar.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant='icon'>
          <IconCalendarCancel />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No hay asistencias</EmptyTitle>
          <EmptyDescription className='max-w-xs text-pretty'>
            No hay asistencias para mostrar en el calendario. Por favor verifica
            más tarde.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <AttendanceCalendarClientTable attendanceCalendar={attendanceCalendar}>
      {children}
    </AttendanceCalendarClientTable>
  )
}
