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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  IconCopy,
  IconPencil,
  IconQrcode,
} from '@tabler/icons-react'
import {
  IconTrash,
} from '@tabler/icons-react'
import { IconDots } from '@tabler/icons-react'
import { toast } from 'sonner'
import { UserSchedule } from '@/types'
import { SelectUser } from '@/db/schema'
import PastoralIdQRCode from '../dashboard/pastoraldQrCode'
import { UserScheduleFilterOptions } from '@/lib/filter'
import { setUserSchedule } from '@/actions/user'

interface DataTableRowActionsProps {
  row: Row<SelectUser>
}

const handleSetUserSchedule = async (
  schedule: UserSchedule,
  userId: SelectUser['id'] 
) => {
  toast.promise(setUserSchedule(schedule, userId), {
    loading: 'Cambiando programa del catequista...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.success) {
        return data.success
      }
    },
    error: (error) => {
      return error.message || 'Error al cambiar el programa del catequista.'
    },
  })
}

export function AdminUserRowActions({ row }: DataTableRowActionsProps) {
  return (
    <div className='flex gap-4' key={row.id}>
      <Dialog>
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
              onClick={() =>
                navigator.clipboard
                  .writeText(row.original.id)
                  .then(() =>
                    toast.info(
                      'El ID del catequista ha sido copiado al portapapeles'
                    )
                  )
              }
            >
              <IconCopy />
              Copiar ID de catequista
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <IconQrcode />
                Ver Pastoral ID
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <IconPencil />
                Modificar programa
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.schedule}
                  onValueChange={(value) => {
                    handleSetUserSchedule(
                      value as UserSchedule,
                      row.original.id
                    )
                  }}
                >
                  {UserScheduleFilterOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                      disabled={row.original.schedule === option.value}
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
              Eliminar catequista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <PastoralIdQRCode userId={row.original.id} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
