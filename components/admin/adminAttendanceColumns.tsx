'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendanceProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'

export const AdminAttendanceColumns: ColumnDef<FetchAttendanceProps>[] = [
  {
    id: 'catequista',
    accessorKey: 'user.firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Catequista' />
    ),
    cell: ({ row }) => {
      const firstName = row.original.user.firstName as string
      const lastName = row.original.user.lastName as string
      return (
        <span className='text-nowrap text-left'>
          {firstName} {lastName}
        </span>
      )
    },
  },
  {
    id: 'horaDeIngreso',
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hora de Ingreso' />
    ),
    cell: ({ row }) => {
      const checkInTime = row.original.checkInTime
      const formattedTime = (checkInTime as Date).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      return <span className='text-left'>{formattedTime}</span>
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
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='flex gap-4' key={row.id}>
          <Button variant='ghost' size='icon' className='h-5 w-5 p-0' disabled>
            <IconEdit />
          </Button>
          <Button variant='ghost' size='icon' className='h-5 w-5 p-0' disabled>
            <IconTrash className='text-red-500' />
          </Button>
        </div>
      )
    },
  },
]
