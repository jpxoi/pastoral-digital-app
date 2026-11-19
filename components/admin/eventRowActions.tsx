'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IconDots, IconPencil } from '@tabler/icons-react'
import { updateEventDetails } from '@/actions/event'
import type { FetchEventProps } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

export default function EventRowActions({ event }: { event: FetchEventProps }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const router = useRouter()

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!pending) setOpen(value)
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon-sm'
            aria-label={`Acciones de ${event.name}`}
          >
            <IconDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            <IconPencil />
            Editar evento
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='text-left'>
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
          <DialogDescription>
            Actualiza el nombre y la descripción del evento.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            setPending(true)
            try {
              const result = await updateEventDetails({
                id: event.id,
                name: data.get('name'),
                description: data.get('description'),
              })
              if ('error' in result) {
                toast.error(result.error)
                return
              }
              toast.success(result.success)
              setOpen(false)
              router.refresh()
            } catch {
              toast.error('No se pudo actualizar el evento.')
            } finally {
              setPending(false)
            }
          }}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor={`name-${event.id}`}>Nombre</Label>
            <Input
              id={`name-${event.id}`}
              name='name'
              defaultValue={event.name}
              required
              maxLength={200}
              disabled={pending}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor={`description-${event.id}`}>Descripción</Label>
            <Textarea
              id={`description-${event.id}`}
              name='description'
              defaultValue={event.description ?? ''}
              maxLength={5000}
              disabled={pending}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={pending}>
              {pending ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
