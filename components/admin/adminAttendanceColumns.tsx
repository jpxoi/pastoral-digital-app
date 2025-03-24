'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendanceProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'

export const AdminAttendanceColumns: ColumnDef<FetchAttendanceProps>[] = [
  {
    id: 'firstName',
    accessorKey: 'user.firstName',
    header: 'Nombres',
    cell: ({ row }) => {
      const firstName = row.original.user.firstName as string
      return <div className='text-nowrap text-left'>{firstName}</div>
    },
  },
  {
    id: 'lastName',
    accessorKey: 'user.lastName',
    header: 'Apellidos',
    cell: ({ row }) => {
      const lastName = row.original.user.lastName as string
      return <div className='text-nowrap text-left'>{lastName}</div>
    },
  },
  {
    id: 'checkInTime',
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Marca de Tiempo' />
    ),
    cell: ({ row }) => {
      const checkInTime = row.getValue('checkInTime')
      const formattedTime = (checkInTime as Date).toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      const mobileFormattedTime = (checkInTime as Date).toLocaleDateString(
        'es-PE',
        {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      )

      return (
        <div className='text-left'>
          <span className='hidden md:block'>{formattedTime}</span>
          <span className='md:hidden'>{mobileFormattedTime}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-right'>Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <div className='text-right'>
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
