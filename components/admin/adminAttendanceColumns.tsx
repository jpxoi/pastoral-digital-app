'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendancePropsWithEvent } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { AdminAttendanceRowActions } from './adminAttendanceRowActions'
import { format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { es } from 'date-fns/locale'

const columnHelper = createColumnHelper<
  DataTableFeatures,
  FetchAttendancePropsWithEvent
>()

export const getAdminAttendanceColumns = (
  canUpdate: boolean,
  canDelete: boolean
) =>
  columnHelper.columns([
    columnHelper.accessor(
      (row) => `${row.user.firstName} ${row.user.lastName}`,
      {
        id: 'catequista',
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
      }
    ),
    columnHelper.accessor('event.name', {
      id: 'evento',
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
    }),
    columnHelper.accessor('checkInTime', {
      id: 'horaDeIngreso',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Hora de Ingreso' />
      ),
      cell: ({ row }) => {
        const checkInTime = new Date(row.original.checkInTime)
        const formattedTime = format(checkInTime, "PP '·' pp", {
          locale: es,
          in: tz('America/Lima'),
        })

        return (
          <time
            dateTime={checkInTime.toISOString()}
            className='text-left text-nowrap tabular-nums'
          >
            {formattedTime}
          </time>
        )
      },
    }),
    columnHelper.accessor('status', {
      id: 'estado',
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
    }),
    ...(canUpdate || canDelete
      ? [
          columnHelper.display({
            id: 'acciones',
            cell: ({ row }) => (
              <AdminAttendanceRowActions
                row={row}
                canUpdate={canUpdate}
                canDelete={canDelete}
              />
            ),
          }),
        ]
      : []),
  ])
