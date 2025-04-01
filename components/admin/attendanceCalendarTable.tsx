import { getAttendanceCalendar } from '@/queries/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'
import { cn } from '@/lib/utils'

export default async function AttendanceCalendarTable() {
  const attendanceCalendar = await getAttendanceCalendar()
  const ignoreColumns = ['id', 'fullName']

  const attendanceBadgeClassName =
    'flex w-12 cursor-pointer items-center justify-center rounded-md px-2 font-bold transition-colors'

  return (
    <div className='relative h-[calc(100vh-8rem)] overflow-auto rounded-md border'>
      <Table className='max-h-full text-left'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-nowrap'>Nombre Completo</TableHead>
            {Object.keys(attendanceCalendar[0])
              .filter((key) => {
                return !ignoreColumns.includes(key)
              })
              .map((key) => (
                <TableHead key={key} className='text-nowrap'>
                  {new Date(key).toLocaleDateString('es-PE', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceCalendar.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='text-nowrap font-medium'>
                {row.fullName}
              </TableCell>
              {Object.keys(attendanceCalendar[0])
                .filter((key) => {
                  return !ignoreColumns.includes(key)
                })
                .map((key) => (
                  <TableCell key={key}>
                    {row[key] === 'A TIEMPO' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900'
                        )}
                      >
                        A
                      </span>
                    ) : row[key] === 'TARDANZA' ||
                      row[key] === 'DOBLE TARDANZA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900'
                        )}
                      >
                        T
                      </span>
                    ) : row[key] === 'FALTA INJUSTIFICADA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-900'
                        )}
                      >
                        F
                      </span>
                    ) : row[key] === 'FALTA JUSTIFICADA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'
                        )}
                      >
                        FJ
                      </span>
                    ) : row[key] === 'TARDANZA JUSTIFICADA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900'
                        )}
                      >
                        TJ
                      </span>
                    ) : (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-neutral-100 text-neutral-500'
                        )}
                      >
                        -
                      </span>
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
