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
import { parseUserRole, UserRole } from '@/types'
import type {
  AssignmentCatalog,
  UserWithAssignments,
} from '@/types/assignments'
import { useState } from 'react'
import UserAssignmentEditor from './userAssignmentEditor'
import { PastoralIdCard } from '../dashboard/pastoral-id-card'
import { useFotocheckDownload } from '@/components/fotochecks/generate-button'
import { IconIdBadge2 } from '@tabler/icons-react'
import { UserRoleFilterOptions } from '@/lib/filter'
import { setUserRole, removeCatechist } from '@/actions/user'

interface DataTableRowActionsProps {
  row: Row<UserWithAssignments>
  canSetRole: boolean
  canDelete: boolean
  canEditAssignments: boolean
  canViewPastoralId: boolean
  canGenerateFotochecks: boolean
  catalog: AssignmentCatalog
}

const handleSetUserRole = async (role: UserRole, userId: string) => {
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
  canDelete,
  canEditAssignments,
  canViewPastoralId,
  canGenerateFotochecks,
  catalog,
}: DataTableRowActionsProps) {
  const { download, pending } = useFotocheckDownload()
  const [editingAssignments, setEditingAssignments] = useState(false)
  const parsedRole = parseUserRole(row.original.role)
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
            {canViewPastoralId && (
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <IconQrcode />
                  Ver Pastoral ID
                </DropdownMenuItem>
              </DialogTrigger>
            )}

            {canGenerateFotochecks && (
              <DropdownMenuItem
                disabled={pending}
                onSelect={() => void download(row.original.id)}
              >
                <IconIdBadge2 /> Generar fotocheck
              </DropdownMenuItem>
            )}

            {canEditAssignments && (
              <DropdownMenuItem onSelect={() => setEditingAssignments(true)}>
                <IconPencil />
                Modificar asignaciones
              </DropdownMenuItem>
            )}

            {canSetRole && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <IconPencil />
                  Cambiar rol
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={parsedRole ?? ''}
                    onValueChange={(value) =>
                      handleSetUserRole(value as UserRole, row.original.id)
                    }
                  >
                    {UserRoleFilterOptions.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        disabled={parsedRole === option.value}
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
            {canDelete && (
              <DropdownMenuItem
                variant='destructive'
                onSelect={() => {
                  if (
                    !window.confirm(
                      `¿Eliminar permanentemente a ${row.original.firstName} ${row.original.lastName}, su cuenta y sus registros? Esta acción no se puede deshacer.`
                    )
                  )
                    return
                  toast.promise(removeCatechist(row.original.id), {
                    loading: 'Eliminando catequista...',
                    success: (data) => {
                      if (data.error) throw new Error(data.error)
                      return data.success
                    },
                    error: (error) =>
                      error.message || 'Error al eliminar catequista.',
                  })
                }}
              >
                <IconTrash />
                Eliminar catequista
              </DropdownMenuItem>
            )}
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
            assignments={row.original.catechistAssignments}
          />
        </DialogContent>
      </Dialog>
      {editingAssignments && (
        <UserAssignmentEditor
          user={row.original}
          catalog={catalog}
          onClose={() => setEditingAssignments(false)}
        />
      )}
    </div>
  )
}
