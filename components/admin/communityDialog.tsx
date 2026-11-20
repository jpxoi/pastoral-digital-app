'use client'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createCommunity, updateCommunity } from '@/actions/community'
import type { AssignmentCatalog } from '@/types/assignments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function CommunityDialog({
  catalog,
  community,
  defaultProgramId,
  onClose,
}: {
  catalog: AssignmentCatalog
  community?: AssignmentCatalog['communities'][number]
  defaultProgramId?: string
  onClose: () => void
}) {
  const id = useId()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [programId, setProgramId] = useState(
    community?.programId ?? defaultProgramId ?? ''
  )
  const [error, setError] = useState<string>()

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose()
      }}
    >
      <DialogContent className='text-left'>
        <DialogHeader>
          <DialogTitle>
            {community ? 'Editar comunidad' : 'Crear comunidad'}
          </DialogTitle>
          <DialogDescription>
            {community
              ? 'Actualiza el nombre de la comunidad dentro de su programa.'
              : 'Selecciona el programa y escribe el nombre de la comunidad.'}
          </DialogDescription>
        </DialogHeader>
        <form
          className='space-y-4'
          onSubmit={async (event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setPending(true)
            setError(undefined)
            try {
              const result = community
                ? await updateCommunity({
                    id: community.id,
                    name: data.get('name'),
                  })
                : await createCommunity({ programId, name: data.get('name') })
              if ('error' in result) {
                setError(result.error)
                toast.error(result.error)
                return
              }
              toast.success(result.success)
              onClose()
              router.refresh()
            } catch {
              setError('No se pudo guardar la comunidad. Inténtalo nuevamente.')
              toast.error('No se pudo guardar la comunidad.')
            } finally {
              setPending(false)
            }
          }}
        >
          <div className='space-y-2'>
            <Label htmlFor={`${id}-program`}>Programa</Label>
            <Select
              value={programId}
              onValueChange={setProgramId}
              disabled={pending || !!community}
              required
            >
              <SelectTrigger id={`${id}-program`} className='w-full'>
                <SelectValue placeholder='Selecciona un programa' />
              </SelectTrigger>
              <SelectContent>
                {catalog.programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor={`${id}-name`}>Nombre</Label>
            <Input
              id={`${id}-name`}
              name='name'
              defaultValue={community?.name ?? ''}
              required
              maxLength={200}
              disabled={pending}
              aria-describedby={error ? `${id}-error` : undefined}
            />
          </div>
          {error && (
            <p
              id={`${id}-error`}
              role='alert'
              className='text-destructive text-sm'
            >
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={pending}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={pending || !programId}>
              {pending
                ? 'Guardando...'
                : community
                  ? 'Guardar cambios'
                  : 'Crear comunidad'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
