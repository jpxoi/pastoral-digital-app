'use client'

import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IconCopy, IconPencil, IconQrcode } from '@tabler/icons-react'
import { IconTrash } from '@tabler/icons-react'
import { IconDots } from '@tabler/icons-react'
import { toast } from 'sonner'
import { UserRole, UserSchedule } from '@/types'
import { SelectUser } from '@/db/schema'
import { PastoralIdCard } from '../dashboard/pastoral-id-card'
import { useFotocheckDownload } from '@/components/fotochecks/generate-button'
import { IconIdBadge2 } from '@tabler/icons-react'
import { UserRoleFilterOptions, UserScheduleFilterOptions } from '@/lib/filter'
import { setUserRole, setUserSchedule } from '@/actions/user'

interface DataTableRowActionsProps {
  row: Row<SelectUser>
  canSetRole: boolean
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

const handleSetUserRole = async (role: UserRole, userId: SelectUser['id']) => {
  toast.promise(setUserRole(userId, role), {
    loading: 'Cambiando rol del catequista...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) throw new Error(data.error)
      return data.success || 'Rol actualizado.'
    },
    error: (error) => error.message || 'Error al cambiar el rol.',
  })
}

export function AdminUserRowActions({
  row,
  canSetRole,
}: DataTableRowActionsProps) {
  const { download, pending } = useFotocheckDownload()
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

            <DropdownMenuItem
              disabled={pending}
              onSelect={() => void download(row.original.id)}
            >
              <IconIdBadge2 /> Generar fotocheck
            </DropdownMenuItem>

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

            {canSetRole && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <IconPencil />
                  Cambiar rol
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.role}
                    onValueChange={(value) =>
                      handleSetUserRole(value as UserRole, row.original.id)
                    }
                  >
                    {UserRoleFilterOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        disabled={row.original.role === option.value}
                      >
                        <option.icon className='mr-2 size-4' />
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem disabled className='text-red-500'>
              <IconTrash />
              Eliminar catequista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className='max-h-[calc(100dvh-2rem)] gap-0 overflow-x-hidden overflow-y-auto border-none p-0 sm:max-w-sm'>
          <DialogHeader className='border-b p-4 pr-12'>
            <DialogTitle className='flex items-center gap-2'>
              <IconQrcode /> Pastoral ID
            </DialogTitle>
          </DialogHeader>
          <PastoralIdCard
            userId={row.original.id}
            name={`${row.original.firstName.trim().split(/\s+/)[0]} ${row.original.lastName}`}
            schedule={row.original.schedule}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
