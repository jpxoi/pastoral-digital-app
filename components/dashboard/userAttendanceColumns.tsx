'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { SelectAttendance } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'

export const UserAttendanceColumns: ColumnDef<SelectAttendance>[] = [
  {
    accessorKey: 'checkInTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hora del Registro' />
    ),
    cell: ({ row }) => {
      const checkInTime = row.getValue('checkInTime')
      const formattedTime = (checkInTime as Date).toLocaleDateString('es-PE', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      return <div className='text-left'>{formattedTime}</div>
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-right'>Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue('status')
      return (
        <div className='flex items-center justify-end'>
          <AttendanceStatusLabel status={status as string} />
        </div>
      )
    },
  },
]
