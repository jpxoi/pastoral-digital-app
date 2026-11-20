'use client'

import { Row } from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  removeAttendanceRecord,
  setAttendanceRecordStatus,
} from '@/actions/attendance'
import { AttendanceStatusFilterOptions } from '@/lib/filter'
import { SelectAttendance } from '@/db/schema'

interface DataTableRowActionsProps {
  row: Row<FetchAttendanceProps>
  canUpdate: boolean
  canDelete: boolean
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

const handleDeleteAttendanceRecord = async (
  recordId: SelectAttendance['id']
) => {
  toast.promise(removeAttendanceRecord(recordId), {
    loading: 'Eliminando asistencia...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.success) {
        return data.success
      }
    },
    error: (error) => {
      return error.message || 'Error al eliminar la asistencia.'
    },
  })
}

export function AdminAttendanceRowActions({
  row,
  canUpdate,
  canDelete,
}: DataTableRowActionsProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  return (
    <>
      <DropdownMenu key={row.id}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <IconDots className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
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
          {canUpdate && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconPencil />
                Modificar estado
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.status}
                  onValueChange={(value) => {
                    void handleSetAttendanceRecordStatus(
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
          )}
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant='destructive'
                onSelect={() => setConfirmingDelete(true)}
              >
                <IconTrash />
                Eliminar registro
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar registro de asistencia?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará el registro de asistencia de{' '}
              {row.original.user.firstName} {row.original.user.lastName}. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant='destructive-solid'
              onClick={() => {
                if (canDelete) {
                  void handleDeleteAttendanceRecord(row.original.id)
                }
              }}
            >
              Eliminar registro
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
