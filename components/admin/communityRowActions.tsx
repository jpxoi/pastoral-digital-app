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
  const router = useRouter()

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
            onSelect={async () => {
              const program = catalog.programs.find(
                (program) => program.id === community.programId
              )
              if (
                !window.confirm(
                  `¿Eliminar permanentemente la comunidad ${community.name} de ${program?.name}? Esta acción no se puede deshacer. Solo se pueden eliminar comunidades sin catequistas asignados.`
                )
              )
                return
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
            <IconTrash />
            Eliminar comunidad
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
