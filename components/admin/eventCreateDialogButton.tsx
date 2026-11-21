'use client'

import { postNewEvent } from '@/actions/event'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
    const response = await postNewEvent(values)

    if ('error' in response) {
      toast.error(response.error)
      return
    }

    toast.success(response.success)
    form.reset()
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!form.formState.isSubmitting) setOpen(nextOpen)
      }}
    >
      <DialogTrigger asChild>
        <Button size='sm' disabled={locations.length === 0}>
          <IconPlus />
          Crear evento
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90dvh] overflow-y-auto text-left sm:max-w-2xl'>
        <DialogHeader className='min-w-0 text-left'>
          <DialogTitle>Crear evento</DialogTitle>
          <DialogDescription>
            Completa los datos del evento y define sus turnos de asistencia.
          </DialogDescription>
        </DialogHeader>

        {locations.length === 0 ? (
          <p className='text-muted-foreground text-sm'>
            No hay ubicaciones registradas en la base de datos.
          </p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-5'
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una ubicación' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem
                            key={location.id}
                            value={String(location.id)}
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

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setOpen(false)}
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type='submit' disabled={form.formState.isSubmitting}>
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
