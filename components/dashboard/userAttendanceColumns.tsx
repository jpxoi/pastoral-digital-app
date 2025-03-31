'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendancePropsWithEvent } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const UserAttendanceColumns: ColumnDef<FetchAttendancePropsWithEvent>[] = [
  {
    accessorKey: 'event.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Evento' />
    ),
    cell: ({ row }) => {
      const eventName = row.original.event.name
      const checkInTime = row.original.checkInTime
      const formattedTime = (checkInTime as Date).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      return (
        <div className='flex flex-col gap-1 text-left'>
          <span className='text-nowrap font-medium'>{eventName}</span>
          <span className='text-xs text-gray-500'>{formattedTime}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-right'>Estado</div>,
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className='flex items-center justify-end'>
          <AttendanceStatusLabel status={status as string} />
        </div>
      )
    },
  },
]
