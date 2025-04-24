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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconCopy, IconPencil } from '@tabler/icons-react'
import { IconTrash } from '@tabler/icons-react'
import { IconDots } from '@tabler/icons-react'
import { toast } from 'sonner'
import { AttendanceStatus, FetchAttendanceProps } from '@/types'
import { setAttendanceRecordStatus } from '@/actions/attendance'
import { AttendanceStatusFilterOptions } from '@/lib/filter'
import { SelectAttendance } from '@/db/schema'

interface DataTableRowActionsProps {
  row: Row<FetchAttendanceProps>
}

const handleSetAttendanceRecordStatus = async (
  status: AttendanceStatus,
  recordId: SelectAttendance['id']
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

export function AdminAttendanceRowActions({ row }: DataTableRowActionsProps) {
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
              {AttendanceStatusFilterOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  disabled={row.original.status === option.value}
                >
                  <option.icon className='mr-2 size-4' />
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
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
