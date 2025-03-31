'use client'

import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import { Button } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { AttendanceStatus, FetchAttendancePropsWithEvent } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import {
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
  IconClockX,
  IconCopy,
  IconDots,
  IconTrash,
} from '@tabler/icons-react'
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
import Link from 'next/link'

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
          <span className='text-nowrap text-left'>
            {row.getValue('catequista')}
          </span>
        )
      },
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
            className='text-left hover:underline'
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
        const checkInTime = row.original.checkInTime
        const formattedTime = (checkInTime as Date).toLocaleDateString(
          'es-PE',
          {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          }
        )

        return <span className='text-left'>{formattedTime}</span>
      },
    },
    {
      accessorKey: 'estado',
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
          <DropdownMenu key={row.id}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir menu</span>
                <IconDots className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard
                    .writeText(row.original.id)
                    .then(() =>
                      toast.info(
                        'El ID de asistencia ha sido copiado al portapapeles'
                      )
                    )
                }
              >
                <IconCopy />
                Copiar ID de asistencia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={row.original.status === AttendanceStatus.A_TIEMPO}
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.A_TIEMPO,
                    row.original.id
                  )
                }
              >
                <IconClockCheck />
                Marcar A Tiempo
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={row.original.status === AttendanceStatus.TARDANZA}
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.TARDANZA,
                    row.original.id
                  )
                }
              >
                <IconClockExclamation />
                Marcar Tardanza
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.status === AttendanceStatus.DOBLE_TARDANZA
                }
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.DOBLE_TARDANZA,
                    row.original.id
                  )
                }
              >
                <IconClockX />
                Marcar Doble Tardanza
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.status === AttendanceStatus.FALTA_JUSTIFICADA
                }
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.FALTA_JUSTIFICADA,
                    row.original.id
                  )
                }
              >
                <IconCalendarHeart />
                Marcar Falta Justificada
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.status === AttendanceStatus.TARDANZA_JUSTIFICADA
                }
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.TARDANZA_JUSTIFICADA,
                    row.original.id
                  )
                }
              >
                <IconClockHeart />
                Marcar Tardanza Justificada
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  row.original.status === AttendanceStatus.FALTA_INJUSTIFICADA
                }
                onClick={() =>
                  handleSetAttendanceRecordStatus(
                    AttendanceStatus.FALTA_INJUSTIFICADA,
                    row.original.id
                  )
                }
              >
                <IconCalendarX />
                Marcar Falta Injustificada
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className='text-red-500'>
                <IconTrash />
                Eliminar asistencia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
