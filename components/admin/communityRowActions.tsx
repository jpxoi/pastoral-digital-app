'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { deleteCommunity } from '@/actions/community'
import type { AssignmentCatalog } from '@/types/assignments'
import CommunityDialog from '@/components/admin/communityDialog'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function CommunityRowActions({
  community,
  catalog,
}: {
  community: AssignmentCatalog['communities'][number]
  catalog: AssignmentCatalog
}) {
  const [editing, setEditing] = useState(false)
  const [pending, setPending] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const router = useRouter()
  const program = catalog.programs.find(
    (program) => program.id === community.programId
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon-sm'
            disabled={pending}
            aria-label={`Acciones de ${community.name}`}
          >
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setEditing(true)}>
            <IconPencil />
            Editar comunidad
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant='destructive'
            disabled={pending}
            onSelect={() => setConfirmingDelete(true)}
          >
            <IconTrash />
            Eliminar comunidad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar comunidad?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará permanentemente la comunidad {community.name}
              {program ? ` de ${program.name}` : ''}. Esta acción no se puede
              deshacer. Solo se pueden eliminar comunidades sin catequistas
              asignados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant='destructive-solid'
              disabled={pending}
              onClick={async () => {
                setPending(true)
                try {
                  const result = await deleteCommunity(community.id)
                  if ('error' in result) {
                    toast.error(result.error)
                    return
                  }
                  toast.success(result.success)
                  router.refresh()
                } catch {
                  toast.error('No se pudo eliminar la comunidad.')
                } finally {
                  setPending(false)
                }
              }}
            >
              Eliminar comunidad
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {editing && (
        <CommunityDialog
          catalog={catalog}
          community={community}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  )
}
