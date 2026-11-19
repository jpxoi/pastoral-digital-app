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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { NewEventFormSchema } from '@/schema'
import { SelectLocation } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconInfoCircle, IconPlus } from '@tabler/icons-react'
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
  const form = useForm<EventFormValues>({
    resolver: zodResolver(NewEventFormSchema),
    defaultValues: {
      name: '',
      description: '',
      firstTurnDate: '',
      secondTurnDate: '',
      endDate: '',
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
        <Button disabled={locations.length === 0}>
          <IconPlus />
          Crear evento
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Crear evento</DialogTitle>
          <DialogDescription>
            Completa los datos y horarios del evento. Las fechas y horas se
            interpretan en horario de Perú.
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
              className='space-y-5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del evento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej. Encuentro de catequesis'
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Detalles del evento'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='firstTurnDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primer turno · Comunión</FormLabel>
                      <FormControl>
                        <Input type='datetime-local' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='secondTurnDate'
                  render={({ field }) => (
                    <FormItem>
                      <div className='flex items-center gap-1.5'>
                        <FormLabel>Segundo turno · Confirmación</FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type='button'
                                className='text-muted-foreground hover:text-foreground rounded-full'
                                aria-label='Ayuda sobre los turnos'
                              >
                                <IconInfoCircle className='h-4 w-4' />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className='max-w-72'>
                              <p>
                                El primer turno aplica a Comunión y el segundo
                                a Confirmación. Si ambos ingresos son a la
                                misma hora, repite aquí la fecha y hora del
                                primer turno.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormControl>
                        <Input type='datetime-local' {...field} />
                      </FormControl>
                      <p className='text-muted-foreground text-sm'>
                        Déjalo vacío para usar el horario del primer turno.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fin del evento</FormLabel>
                    <FormControl>
                      <Input type='datetime-local' {...field} />
                    </FormControl>
                    <p className='text-muted-foreground text-sm'>
                      Obligatorio. Para eventos de día completo, indica cuándo
                      termina el último turno.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='locationId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <FormControl>
                      <select
                        className='border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                        {...field}
                      >
                        <option value=''>Selecciona una ubicación</option>
                        {locations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name} · {location.address}
                          </option>
                        ))}
                      </select>
                    </FormControl>
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
