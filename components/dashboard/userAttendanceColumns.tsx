'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { FetchAttendancePropsWithEvent } from '@/types'
import { format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { es } from 'date-fns/locale'
import { ColumnDef } from '@tanstack/react-table'

export const UserAttendanceColumns: ColumnDef<FetchAttendancePropsWithEvent>[] =
  [
    {
      accessorKey: 'event.name',
      header: 'Evento',
      cell: ({ row }) => {
        const eventName = row.original.event.name
        const checkInTime = new Date(row.original.checkInTime)
        const formattedTime = format(checkInTime, 'PP pp', {
          locale: es,
          in: tz('America/Lima'),
        })

        return (
          <div className='flex flex-col gap-1 text-left'>
            <span className='font-medium text-nowrap'>{eventName}</span>
            <span className='text-xs text-nowrap text-gray-500'>
              {formattedTime}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className='w-full text-right'>
          <span>Estado</span>
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <div className='flex items-center justify-end'>
            <AttendanceStatusLabel status={status} />
          </div>
        )
      },
    },
  ]
