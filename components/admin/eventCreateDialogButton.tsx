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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
        <Button disabled={locations.length === 0}>
          <IconPlus />
          Crear evento
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] overflow-y-auto text-left sm:max-w-2xl'>
        <DialogHeader className='text-left'>
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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='text-left'>
                    <FormLabel className='block w-full text-left'>
                      Nombre del evento
                    </FormLabel>
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
                  <FormItem className='text-left'>
                    <FormLabel className='block w-full text-left'>
                      Descripción (opcional)
                    </FormLabel>
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

              <div className='grid gap-5 sm:grid-cols-2'>
                <section className='space-y-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <h3 className='text-sm font-semibold'>Primer turno</h3>
                    <span className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800'>
                      Comunión
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name='firstTurnDate'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Fecha
                        </FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='firstTurnTime'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Hora
                        </FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <section className='space-y-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-1.5'>
                      <h3 className='text-sm font-semibold'>Segundo turno</h3>
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
                              El primer turno aplica a Comunión y el segundo a
                              Confirmación. Si ambos ingresos son a la misma
                              hora, repite aquí la fecha y hora del primer
                              turno.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className='rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800'>
                      Confirmación
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name='secondTurnDate'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Fecha
                        </FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='secondTurnTime'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Hora
                        </FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className='text-muted-foreground text-left text-sm'>
                    Deja ambos campos vacíos para usar el horario del primer
                    turno.
                  </p>
                </section>
              </div>

              <section className='space-y-3'>
                <h3 className='text-sm font-semibold'>Fin del evento</h3>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='endDate'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Fecha
                        </FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='endTime'
                    render={({ field }) => (
                      <FormItem className='text-left'>
                        <FormLabel className='block w-full text-left'>
                          Hora
                        </FormLabel>
                        <FormControl>
                          <Input type='time' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <FormField
                control={form.control}
                name='locationId'
                render={({ field }) => (
                  <FormItem className='text-left'>
                    <FormLabel className='block w-full text-left'>
                      Ubicación
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una ubicación' />
                        </SelectTrigger>
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
