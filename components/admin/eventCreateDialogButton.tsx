'use client'

import { Spinner } from '@/components/ui/spinner'

import { applyFormErrors } from '@/lib/form-errors'
import { FormServerError } from '@/components/shared/form-server-error'

import { postNewEvent } from '@/actions/event'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { addDays, startOfDay, subDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import EventFormFields from '@/components/admin/eventFormFields'
import { NewEventFormSchema } from '@/schema'
import { SelectLocation } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type EventFormValues = z.infer<typeof NewEventFormSchema>

export default function EventCreateDialogButton({
  locations,
}: {
  locations: SelectLocation[]
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const today = startOfDay(new Date())
  const minEventDate = subDays(today, 14)
  const maxEventDate = addDays(today, 365)
  const form = useForm<EventFormValues>({
    resolver: zodResolver(NewEventFormSchema),
    defaultValues: {
      name: '',
      description: '',
      firstTurnDate: '',
      firstTurnTime: '',
      secondTurnDate: '',
      secondTurnTime: '',
      endDate: '',
      endTime: '',
      locationId: '',
    },
  })

  const onSubmit = async (values: EventFormValues) => {
    form.clearErrors()
    try {
      const response = await postNewEvent(values)
      if (!response.success) {
        applyFormErrors(form, response, [
          'name',
          'firstTurnDate',
          'firstTurnTime',
          'secondTurnDate',
          'secondTurnTime',
          'endDate',
          'endTime',
          'locationId',
        ])
        return
      }
      toast.success(response.success)
      form.reset()
      setOpen(false)
      router.refresh()
    } catch {
      applyFormErrors(
        form,
        { error: 'No se pudo crear el evento. Inténtalo nuevamente.' },
        []
      )
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!form.formState.isSubmitting) setOpen(nextOpen)
      }}
    >
      <DialogTrigger asChild>
        <Button
          size='sm'
          className='h-9 w-full sm:h-8 sm:w-auto'
          disabled={locations.length === 0}
        >
          <IconPlus />
          Crear evento
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className='max-h-[90dvh] overflow-y-auto text-left sm:max-w-2xl'
      >
        <DialogHeader className='min-w-0 text-left'>
          <DialogTitle>Crear evento</DialogTitle>
        </DialogHeader>

        {locations.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            No hay ubicaciones registradas en la base de datos.
          </p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex min-w-0 flex-col gap-5'
            >
              <EventFormFields minDate={minEventDate} maxDate={maxEventDate} />

              <FormField
                control={form.control}
                name='locationId'
                render={({ field }) => (
                  <FormItem className='min-w-0 text-left'>
                    <FormLabel className='block w-full text-left'>
                      Ubicación
                    </FormLabel>
                    <Select
                      disabled={form.formState.isSubmitting}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full min-w-0 [&>span]:min-w-0 [&>span]:truncate [&>span]:text-left'>
                          <SelectValue placeholder='Selecciona una ubicación' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent
                        position='popper'
                        className='w-(--radix-select-trigger-width) max-w-(--radix-select-content-available-width)'
                      >
                        {locations.map((location) => (
                          <SelectItem
                            key={location.id}
                            value={String(location.id)}
                            className='whitespace-normal [&>span:last-child]:min-w-0 [&>span:last-child]:wrap-anywhere'
                          >
                            {location.name} — {location.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormServerError
                message={form.formState.errors.root?.serverError?.message}
              />
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  aria-busy={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Spinner aria-hidden='true' />
                  )}
                  {form.formState.isSubmitting ? 'Creando…' : 'Crear evento'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
