import { getAttendanceCalendar } from '@/queries/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { IconAlertCircle } from '@tabler/icons-react'

export default async function AttendanceCalendarTable() {
  const attendanceCalendar = await getAttendanceCalendar()
  const ignoreColumns = ['id', 'fullName']

  if (!attendanceCalendar || attendanceCalendar.length === 0) {
    return (
      <div className='flex items-center justify-start pt-2 text-muted-foreground'>
        <p className='text-sm'>
          No hay asistencias registradas en este momento. Por favor verifica más
          tarde.
        </p>
      </div>
    )
  }

  const attendanceBadgeClassName =
    'flex w-12 cursor-pointer items-center justify-center rounded-md px-2 font-bold transition-colors'

  const dateColumns = Object.keys(attendanceCalendar[0]).filter((key) => {
    return !ignoreColumns.includes(key)
  })

  // Function to count "FALTA INJUSTIFICADA" occurrences for a user
  const countUnjustifiedAbsences = (row: any) => {
    return dateColumns.reduce((count, dateKey) => {
      return count + (row[dateKey] === 'FALTA INJUSTIFICADA' ? 1 : 0)
    }, 0)
  }

  return (
    <div className='relative h-[calc(100vh-8rem)] overflow-auto rounded-md border'>
      <Table className='max-h-full text-left'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-nowrap'>Nombre Completo</TableHead>
            {dateColumns.map((key) => (
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
          {attendanceCalendar.map((row) => {
            const unjustifiedAbsences = countUnjustifiedAbsences(row)
            const showAlert = unjustifiedAbsences > 3

            return (
              <TableRow key={row.id}>
                <TableCell className='text-nowrap font-medium'>
                  <div className='flex items-center gap-2'>
                    {row.fullName}
                    {showAlert && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <IconAlertCircle
                              className='h-4 w-4 text-destructive'
                              title={`${unjustifiedAbsences} faltas injustificadas`}
                            />
                          </TooltipTrigger>
                          <TooltipContent className='bg-red-100'>
                            <p className='text-xs text-red-800'>
                              Este catequista tiene más de 3 faltas no
                              justificadas.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                {dateColumns.map((key) => (
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
                    ) : row[key] === 'TARDANZA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900'
                        )}
                      >
                        T
                      </span>
                    ) : row[key] === 'DOBLE TARDANZA' ? (
                      <span
                        className={cn(
                          attendanceBadgeClassName,
                          'bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900'
                        )}
                      >
                        TT
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
