'use client'

import { Spinner } from '@/components/ui/spinner'

import { applyFormErrors } from '@/lib/form-errors'
import { FormServerError } from '@/components/shared/form-server-error'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IconDots, IconPencil } from '@tabler/icons-react'
import { tz } from '@date-fns/tz'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdateEventFormSchema } from '@/schema'
import { Form } from '@/components/ui/form'
import EventFormFields from '@/components/admin/eventFormFields'
import { updateEventDetails } from '@/actions/event'
import type { FetchEventProps } from '@/types'
import { Button } from '@/components/ui/button'
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

type EventFormValues = z.infer<typeof UpdateEventFormSchema>

function getEventValues(event: FetchEventProps): EventFormValues {
  const options = { in: tz('America/Lima') }
  return {
    id: event.id,
    name: event.name,
    description: event.description ?? '',
    firstTurnDate: format(event.date, 'yyyy-MM-dd', options),
    firstTurnTime: format(event.date, 'HH:mm', options),
    secondTurnDate: format(event.secondTurnDate, 'yyyy-MM-dd', options),
    secondTurnTime: format(event.secondTurnDate, 'HH:mm', options),
    endDate: format(event.endDate, 'yyyy-MM-dd', options),
    endTime: format(event.endDate, 'HH:mm', options),
  }
}

export default function EventRowActions({ event }: { event: FetchEventProps }) {
  const [open, setOpen] = useState(false)
  const form = useForm<EventFormValues>({
    resolver: zodResolver(UpdateEventFormSchema),
    defaultValues: getEventValues(event),
  })
  const pending = form.formState.isSubmitting
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
          <DropdownMenuItem
            onSelect={() => {
              form.reset(getEventValues(event))
              setOpen(true)
            }}
          >
            <IconPencil />
            Editar evento
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className='max-h-[90dvh] overflow-y-auto text-left sm:max-w-2xl'>
        <DialogHeader className='min-w-0 text-left'>
          <DialogTitle>Editar evento</DialogTitle>
          <DialogDescription>
            Actualiza el nombre, la descripción y los horarios del evento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              form.clearErrors()
              try {
                const result = await updateEventDetails(values)
                if (!result.success) {
                  applyFormErrors(form, result, [
                    'name',
                    'description',
                    'firstTurnDate',
                    'firstTurnTime',
                    'secondTurnDate',
                    'secondTurnTime',
                    'endDate',
                    'endTime',
                  ])
                  return
                }
                toast.success(result.success)
                setOpen(false)
                router.refresh()
              } catch {
                applyFormErrors(
                  form,
                  { error: 'No se pudo actualizar el evento.' },
                  []
                )
              }
            })}
            className='flex flex-col gap-5'
          >
            <EventFormFields minuteStep={1} />
            <FormServerError
              message={form.formState.errors.root?.serverError?.message}
            />
            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                disabled={pending}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={pending} aria-busy={pending}>
                {pending && <Spinner aria-hidden='true' />}
                {pending ? 'Guardando…' : 'Guardar cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
