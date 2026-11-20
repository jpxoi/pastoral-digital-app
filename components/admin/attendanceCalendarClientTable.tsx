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
import type { ReactNode } from 'react'
import { AttendanceStatus } from '@/types'

type AttendanceCalendarRow = Record<string, string | null>

const ATTENDANCE_LABELS: Record<string, { label: string; className: string }> =
  {
    [AttendanceStatus.A_TIEMPO]: { label: 'A', className: 'text-green-700' },
    [AttendanceStatus.TARDANZA]: { label: 'T', className: 'text-amber-700' },
    [AttendanceStatus.FALTA_INJUSTIFICADA]: {
      label: 'F',
      className: 'text-red-700',
    },
    [AttendanceStatus.FALTA_JUSTIFICADA]: {
      label: 'FJ',
      className: 'text-blue-700',
    },
    [AttendanceStatus.TARDANZA_JUSTIFICADA]: {
      label: 'TJ',
      className: 'text-purple-700',
    },
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
  children,
}: {
  attendanceCalendar: AttendanceCalendarRow[]
  children?: ReactNode
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
    <div className='flex min-h-0 flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center'>
        {children && (
          <div className='order-first flex justify-end md:order-last md:ml-auto md:shrink-0'>
            {children}
          </div>
        )}
        <div className='relative w-full max-w-sm'>
          <IconSearch className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            type='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Buscar por nombre'
            aria-label='Buscar por nombre'
            className='h-8 pl-9'
          />
        </div>
      </div>

      <div
        className={`relative min-h-0 overflow-auto rounded-md border ${
          search.trim() ? 'max-h-[calc(100%-3rem)]' : 'flex-1'
        }`}
      >
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
                    count +
                    (row[dateKey] === AttendanceStatus.FALTA_INJUSTIFICADA
                      ? 1
                      : 0),
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
