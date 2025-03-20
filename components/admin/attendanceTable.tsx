import { getAllAttendanceRecords } from '@/queries/select'

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableCaption,
  TableRow,
} from '@/components/ui/table'
import AttendanceStatusLabel from '../shared/attendanceStatusLabel'
import { Card, CardHeader } from '../ui/card'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './attendance/columns'

export default async function AttendanceTable() {
  const attendanceRecords = await getAllAttendanceRecords()

  return (
    <>
      {/* <Table className='max-md:hidden'>
        <TableCaption>Total: {attendanceRecords.length} registros</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className='font-medium'>
                  {record.user.firstName} {record.user.lastName}
                </TableCell>
                <TableCell>
                  {record.checkInTime?.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <AttendanceStatusLabel status={record.status} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No hay registros de asistencia</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex flex-col gap-4 md:hidden'>
        <p className='text-xs text-muted-foreground'>
          Total: {attendanceRecords.length} registros
        </p>
        {attendanceRecords.length > 0
          ? attendanceRecords.map((record) => (
              <Card>
                <CardHeader className='flex flex-col items-center justify-center'>
                  <h2 className='text-left text-base font-semibold'>
                    {record.user.firstName} {record.user.lastName}
                  </h2>
                  <p className='text-left text-xs text-muted-foreground'>
                    {record.checkInTime?.toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>

                  <AttendanceStatusLabel status={record.status} />
                </CardHeader>
              </Card>
            ))
          : null}
      </div> */}

      <DataTable columns={columns} data={attendanceRecords} />
    </>
  )
}

export const dynamic = 'force-dynamic'
