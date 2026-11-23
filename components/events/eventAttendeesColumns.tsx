'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { FetchAttendanceProps } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'
import { AdminAttendanceRowActions } from '../admin/adminAttendanceRowActions'
import { format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { es } from 'date-fns/locale'

const columnHelper = createColumnHelper<
  DataTableFeatures,
  FetchAttendanceProps
>()

export const getEventAttendeesColumns = (
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
            <span className='font-medium text-nowrap'>
              {row.getValue('catequista')}
            </span>
          )
        },
        enableHiding: false,
        enableGlobalFilter: true,
      }
    ),
    columnHelper.accessor('checkInTime', {
      id: 'horaDeIngreso',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Hora de Ingreso' />
      ),
      cell: ({ row }) => {
        const checkInTime = new Date(row.original.checkInTime)
        const formattedTime = format(checkInTime, 'pp', {
          locale: es,
          in: tz('America/Lima'),
        })
        return <span>{formattedTime}</span>
      },
      enableGlobalFilter: false,
    }),
    columnHelper.accessor(
      (row) =>
        `${row.registeredByUser.firstName} ${row.registeredByUser.lastName}`,
      {
        id: 'registradoPor',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Registrado por' />
        ),
        cell: ({ row }) => {
          return (
            <span className='text-muted-foreground text-nowrap'>
              {row.getValue('registradoPor')}
            </span>
          )
        },
        enableSorting: false,
        enableGlobalFilter: false,
      }
    ),
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
      enableGlobalFilter: false,
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
