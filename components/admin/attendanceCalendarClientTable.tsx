'use client'

import { useMemo, useState } from 'react'
import { IconAlertCircle, IconSearch } from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'

type AttendanceCalendarRow = Record<string, string | null>

const ATTENDANCE_LABELS: Record<string, { label: string; className: string }> =
  {
    'A TIEMPO': { label: 'A', className: 'text-green-700' },
    TARDANZA: { label: 'T', className: 'text-amber-700' },
    'DOBLE TARDANZA': { label: 'TT', className: 'text-orange-700' },
    'FALTA INJUSTIFICADA': { label: 'F', className: 'text-red-700' },
    'FALTA JUSTIFICADA': { label: 'FJ', className: 'text-blue-700' },
    'TARDANZA JUSTIFICADA': { label: 'TJ', className: 'text-purple-700' },
  }

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim()
}

function getStatus(status: string | null) {
  if (!status) return { label: '-', className: 'text-muted-foreground' }
  return (
    ATTENDANCE_LABELS[status] ?? {
      label: '-',
      className: 'text-muted-foreground',
    }
  )
}

export default function AttendanceCalendarClientTable({
  attendanceCalendar,
}: {
  attendanceCalendar: AttendanceCalendarRow[]
}) {
  const [search, setSearch] = useState('')
  const dateColumns = useMemo(
    () =>
      Object.keys(attendanceCalendar[0] ?? {}).filter(
        (key) => key !== 'id' && key !== 'fullName'
      ),
    [attendanceCalendar]
  )
  const filteredRows = useMemo(() => {
    const query = normalizeSearchText(search)
    if (!query) return attendanceCalendar
    return attendanceCalendar.filter((row) =>
      normalizeSearchText(row.fullName ?? '').includes(query)
    )
  }, [attendanceCalendar, search])

  return (
    <div className='space-y-3'>
      <div className='relative w-full max-w-sm'>
        <IconSearch className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
        <Input
          type='search'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Buscar por nombre'
          aria-label='Buscar por nombre'
          className='pl-9'
        />
      </div>

      <div className='relative max-h-[calc(100dvh-13rem)] overflow-auto rounded-md border'>
        <table
          aria-label='Calendario de asistencia'
          className='w-max min-w-full border-separate border-spacing-0 text-left text-sm'
        >
          <thead>
            <tr>
              <th className='bg-background sticky top-0 z-20 h-10 min-w-80 border-b px-3 text-left align-middle font-semibold whitespace-nowrap'>
                Nombre completo
              </th>
              {dateColumns.map((dateKey) => (
                <th
                  key={dateKey}
                  className='bg-background sticky top-0 z-20 h-10 min-w-20 border-b px-3 text-center align-middle font-semibold whitespace-nowrap'
                >
                  {new Date(dateKey).toLocaleDateString('es-PE', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row) => {
                const unjustifiedAbsences = dateColumns.reduce(
                  (count, dateKey) =>
                    count + (row[dateKey] === 'FALTA INJUSTIFICADA' ? 1 : 0),
                  0
                )

                return (
                  <tr
                    key={row.id ?? row.fullName}
                    className='hover:bg-muted/50'
                  >
                    <td className='h-10 border-b px-3 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        {row.fullName}
                        {unjustifiedAbsences > 3 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <IconAlertCircle
                                  className='text-destructive size-4 shrink-0'
                                  aria-label={`${unjustifiedAbsences} faltas injustificadas`}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className='text-xs'>
                                  Este catequista tiene más de 3 faltas no
                                  justificadas.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </td>
                    {dateColumns.map((dateKey) => {
                      const status = row[dateKey]
                      const statusDisplay = getStatus(status)

                      return (
                        <td
                          key={dateKey}
                          className='h-10 min-w-20 border-b px-3 text-center align-middle tabular-nums'
                        >
                          <span
                            className={`font-semibold ${statusDisplay.className}`}
                          >
                            {statusDisplay.label}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan={dateColumns.length + 1}
                  className='text-muted-foreground h-24 text-center'
                >
                  No se encontraron personas con ese nombre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
