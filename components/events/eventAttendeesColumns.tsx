'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendanceProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { AdminAttendanceRowActions } from '../admin/adminAttendanceRowActions'

export const EventAttendeesColumns: ColumnDef<FetchAttendanceProps>[] = [
  {
    id: 'catequista',
    accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Catequista' />
    ),
    cell: ({ row }) => {
      return (
        <span className='text-nowrap font-medium'>
          {row.getValue('catequista')}
        </span>
      )
    },
    enableHiding: false,
  },
  {
    id: 'horaDeIngreso',
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hora de Ingreso' />
    ),
    cell: ({ row }) => {
      const checkInTime = new Date(row.original.checkInTime)
      const formattedTime = checkInTime.toLocaleTimeString('es-PE', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Lima',
      })
      return <span>{formattedTime}</span>
    },
  },
  {
    id: 'registradoPor',
    accessorFn: (row) =>
      `${row.registeredByUser.firstName} ${row.registeredByUser.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Registrado por' />
    ),
    cell: ({ row }) => {
      return (
        <span className='text-nowrap text-muted-foreground'>
          {row.getValue('registradoPor')}
        </span>
      )
    },
  },
  {
    id: 'estado',
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
    enableHiding: false,
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      return <AdminAttendanceRowActions row={row} />
    },
  },
]
