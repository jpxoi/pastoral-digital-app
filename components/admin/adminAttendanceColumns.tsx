'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { AttendanceStatus, FetchAttendanceProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { setAttendanceRecordStatus } from '@/actions/attendance'
import { toast } from 'sonner'

const handleSetAttendanceRecordStatus = async (
  status: AttendanceStatus,
  recordId: string
) => {
  toast.promise(setAttendanceRecordStatus(status, recordId), {
    loading: 'Cambiando estado de asistencia...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.success) {
        return data.success
      }
    },
    error: (error) => {
      return error.message || 'Error al cambiar el estado de asistencia.'
    },
  })
}

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
      const record = row.original
      return (
        <div className='flex gap-4' key={row.id}>
          <Button variant='ghost' size='icon' className='h-5 w-5 p-0' disabled>
            <IconEdit />
          </Button>
          <Button variant='ghost' size='icon' className='h-5 w-5 p-0' disabled>
            <IconTrash className='text-red-500' />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir menu</span>
                <IconDots className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(record.id)}
              >
                Copiar ID de asistencia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.A_TIEMPO,
                    record.id
                  )
                }
              >
                Marcar como A Tiempo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.TARDANZA,
                    record.id
                  )
                }
              >
                Marcar como Tardanza
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.DOBLE_TARDANZA,
                    record.id
                  )
                }
              >
                Marcar como Doble Tardanza
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.FALTA_JUSTIFICADA,
                    record.id
                  )
                }
              >
                Marcar como Falta Justificada
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.TARDANZA_JUSTIFICADA,
                    record.id
                  )
                }
              >
                Marcar como Tardanza Justificada
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.FALTA_INJUSTIFICADA,
                    record.id
                  )
                }
              >
                Marcar como Falta Injustificada
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IconTrash />
                Eliminar asistencia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
