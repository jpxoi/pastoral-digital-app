'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendancePropsWithEvent } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { AdminAttendanceRowActions } from './adminAttendanceRowActions'
import { format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { es } from 'date-fns/locale'

export const AdminAttendanceColumns: ColumnDef<FetchAttendancePropsWithEvent>[] =
  [
    {
      id: 'catequista',
      accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Catequista' />
      ),
      cell: ({ row }) => {
        return (
          <span className='text-left text-nowrap'>
            {row.getValue('catequista')}
          </span>
        )
      },
      enableHiding: false,
    },
    {
      id: 'evento',
      accessorKey: 'event.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Evento' />
      ),
      cell: ({ row }) => {
        return (
          <Link
            href={`/admin/events/${row.original.event.id}`}
            className='text-left text-nowrap hover:underline'
          >
            {row.original.event.name}
          </Link>
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
        const checkInTime = new Date(row.original.checkInTime)
        const formattedTime = format(checkInTime, 'PP pp', {
          locale: es,
          in: tz('America/Lima'),
        })

        return <span className='text-left text-nowrap'>{formattedTime}</span>
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
