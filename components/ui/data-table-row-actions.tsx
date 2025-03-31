'use client'

import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockX,
  IconCopy,
  IconPencil,
} from '@tabler/icons-react'
import {
  IconCalendarHeart,
  IconClockHeart,
  IconTrash,
} from '@tabler/icons-react'
import { IconDots } from '@tabler/icons-react'
import { toast } from 'sonner'
import { AttendanceStatus, FetchAttendanceProps } from '@/types'
import { setAttendanceRecordStatus } from '@/actions/attendance'

interface DataTableRowActionsProps {
  row: Row<FetchAttendanceProps>
}

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

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconPencil />
            Modificar estado
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={row.original.status}
              onValueChange={(value) => {
                handleSetAttendanceRecordStatus(
                  value as AttendanceStatus,
                  row.original.id
                )
              }}
            >
              <DropdownMenuRadioItem
                value={AttendanceStatus.A_TIEMPO}
                disabled={row.original.status === AttendanceStatus.A_TIEMPO}
              >
                <IconClockCheck className='mr-2 h-4 w-4' />A Tiempo
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={AttendanceStatus.TARDANZA}
                disabled={row.original.status === AttendanceStatus.TARDANZA}
              >
                <IconClockExclamation className='mr-2 h-4 w-4' />
                Tardanza
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={AttendanceStatus.DOBLE_TARDANZA}
                disabled={
                  row.original.status === AttendanceStatus.DOBLE_TARDANZA
                }
              >
                <IconClockX className='mr-2 h-4 w-4' />
                Doble Tardanza
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={AttendanceStatus.FALTA_JUSTIFICADA}
                disabled={
                  row.original.status === AttendanceStatus.FALTA_JUSTIFICADA
                }
              >
                <IconCalendarHeart className='mr-2 h-4 w-4' />
                Falta Justificada
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={AttendanceStatus.TARDANZA_JUSTIFICADA}
                disabled={
                  row.original.status === AttendanceStatus.TARDANZA_JUSTIFICADA
                }
              >
                <IconClockHeart className='mr-2 h-4 w-4' />
                Tardanza Justificada
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={AttendanceStatus.FALTA_INJUSTIFICADA}
                disabled={
                  row.original.status === AttendanceStatus.FALTA_INJUSTIFICADA
                }
              >
                <IconCalendarX className='mr-2 h-4 w-4' />
                Falta No Justificada
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className='text-red-500'>
          <IconTrash />
          Eliminar registro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
