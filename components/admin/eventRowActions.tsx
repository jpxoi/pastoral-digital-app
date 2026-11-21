'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IconDots, IconPencil } from '@tabler/icons-react'
import { tz } from '@date-fns/tz'
import { format, parseISO } from 'date-fns'
import { updateEventDetails } from '@/actions/event'
import type { FetchEventProps } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'
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

function EventScheduleFields({
  event,
  disabled,
}: {
  event: FetchEventProps
  disabled: boolean
}) {
  const [schedule, setSchedule] = useState(() => {
    const options = { in: tz('America/Lima') }
    return {
      firstTurnDate: format(event.date, 'yyyy-MM-dd', options),
      firstTurnTime: format(event.date, 'HH:mm', options),
      secondTurnDate: format(event.secondTurnDate, 'yyyy-MM-dd', options),
      secondTurnTime: format(event.secondTurnDate, 'HH:mm', options),
      endDate: format(event.endDate, 'yyyy-MM-dd', options),
      endTime: format(event.endDate, 'HH:mm', options),
    }
  })

  return (
    <div className='space-y-4'>
      <p className='text-muted-foreground text-sm'>Horarios de Perú.</p>
      {(
        [
          ['Primer turno (Comunión)', 'firstTurnDate', 'firstTurnTime'],
          ['Segundo turno (Confirmación)', 'secondTurnDate', 'secondTurnTime'],
          ['Fin del evento', 'endDate', 'endTime'],
        ] as const
      ).map(([label, dateField, timeField]) => (
        <fieldset key={dateField} className='min-w-0 space-y-2'>
          <legend className='text-sm font-medium'>{label}</legend>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,7rem)] gap-3'>
            <div className='min-w-0'>
              <Label htmlFor={`${dateField}-${event.id}`} className='sr-only'>
                Fecha de {label}
              </Label>
              <DatePicker
                id={`${dateField}-${event.id}`}
                disabled={disabled}
                value={
                  schedule[dateField]
                    ? parseISO(schedule[dateField])
                    : undefined
                }
                onChange={(date) =>
                  setSchedule((current) => ({
                    ...current,
                    [dateField]: date ? format(date, 'yyyy-MM-dd') : '',
                  }))
                }
              />
            </div>
            <div className='min-w-0'>
              <Label htmlFor={`${timeField}-${event.id}`} className='sr-only'>
                Hora de {label}
              </Label>
              <TimePicker
                id={`${timeField}-${event.id}`}
                disabled={disabled}
                value={schedule[timeField]}
                onChange={(time) =>
                  setSchedule((current) => ({ ...current, [timeField]: time }))
                }
              />
            </div>
          </div>
          <input type='hidden' name={dateField} value={schedule[dateField]} />
          <input type='hidden' name={timeField} value={schedule[timeField]} />
        </fieldset>
      ))}
      <p className='text-muted-foreground text-sm'>
        Deja la fecha y la hora del segundo turno vacías para usar el horario
        del primero.
      </p>
    </div>
  )
}

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
      <DialogContent className='max-h-[90dvh] overflow-y-auto text-left'>
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
          <DialogDescription>
            Actualiza el nombre, la descripción y los horarios del evento.
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
                firstTurnDate: data.get('firstTurnDate'),
                firstTurnTime: data.get('firstTurnTime'),
                secondTurnDate: data.get('secondTurnDate'),
                secondTurnTime: data.get('secondTurnTime'),
                endDate: data.get('endDate'),
                endTime: data.get('endTime'),
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
          <EventScheduleFields event={event} disabled={pending} />
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
