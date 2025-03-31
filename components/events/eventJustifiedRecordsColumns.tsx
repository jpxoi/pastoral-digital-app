'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendanceProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { IconX } from '@tabler/icons-react'

export const EventJustifiedRecordsColumns: ColumnDef<FetchAttendanceProps>[] = [
  {
    id: 'catequista',
    accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Catequista' />
    ),
    cell: ({ row }) => {
      const formattedTime = (
        row.original.checkInTime as Date
      ).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      return (
        <div className='flex flex-col gap-1 text-left'>
          <span className='text-nowrap font-medium'>
            {row.getValue('catequista')}
          </span>
          <span className='text-xs text-gray-500'>{formattedTime}</span>
        </div>
      )
    },
  },
  {
    id: 'estado',
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
  {
    id: 'acciones',
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-end gap-2' key={row.id}>
          <Button
            variant='ghost'
            className='h-6 p-1 text-red-600 hover:bg-red-50 hover:text-red-600'
          >
            <IconX className='size-4' />
          </Button>
        </div>
      )
    },
  },
]
