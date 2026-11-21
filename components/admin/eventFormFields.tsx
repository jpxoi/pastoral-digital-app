'use client'

import { useFormContext } from 'react-hook-form'
import { format, parseISO } from 'date-fns'
import { IconInfoCircle } from '@tabler/icons-react'
import { z } from 'zod'
import { UpdateEventFormSchema } from '@/schema'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type EventFieldsValues = Omit<z.infer<typeof UpdateEventFormSchema>, 'id'>

export default function EventFormFields({
  minDate,
  maxDate,
  minuteStep = 15,
}: {
  minDate?: Date
  maxDate?: Date
  minuteStep?: number
}) {
  const form = useFormContext<EventFieldsValues>()
  return (
    <>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem className='min-w-0 text-left'>
            <FormLabel className='block w-full text-left'>
              Nombre del evento
            </FormLabel>
            <FormControl>
              <Input
                disabled={form.formState.isSubmitting}
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
          <FormItem className='min-w-0 text-left'>
            <FormLabel className='block w-full text-left'>
              Descripción (opcional)
            </FormLabel>
            <FormControl>
              <Textarea
                disabled={form.formState.isSubmitting}
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
        <section className='flex min-w-0 flex-col gap-3'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-sm font-semibold'>Primer turno</h3>
            <span className='rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-800'>
              Comunión
            </span>
          </div>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,7rem)] gap-3'>
            <FormField
              control={form.control}
              name='firstTurnDate'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Fecha del primer turno
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      value={field.value ? parseISO(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                      }
                      placeholder='Elegir fecha'
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstTurnTime'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Hora del primer turno
                  </FormLabel>
                  <FormControl>
                    <TimePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      minuteStep={minuteStep}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className='flex min-w-0 flex-col gap-3'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-1.5'>
              <h3 className='text-sm font-semibold'>Segundo turno</h3>
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
                  Completa ambos campos para definir un horario distinto.
                  Déjalos vacíos para usar el horario del primer turno.
                </TooltipContent>
              </Tooltip>
            </div>
            <span className='rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800'>
              Confirmación
            </span>
          </div>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,7rem)] gap-3'>
            <FormField
              control={form.control}
              name='secondTurnDate'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Fecha del segundo turno
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      value={field.value ? parseISO(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                      }
                      placeholder='Elegir fecha'
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='secondTurnTime'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Hora del segundo turno
                  </FormLabel>
                  <FormControl>
                    <TimePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      minuteStep={minuteStep}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className='flex min-w-0 flex-col gap-3'>
          <h3 className='text-sm font-semibold'>Fin del evento</h3>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,7rem)] gap-3'>
            <FormField
              control={form.control}
              name='endDate'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Fecha de fin del evento
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      value={field.value ? parseISO(field.value) : undefined}
                      onChange={(date) =>
                        field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                      }
                      placeholder='Elegir fecha'
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='endTime'
              render={({ field }) => (
                <FormItem className='min-w-0 text-left'>
                  <FormLabel className='sr-only'>
                    Hora de fin del evento
                  </FormLabel>
                  <FormControl>
                    <TimePicker
                      disabled={form.formState.isSubmitting}
                      {...field}
                      minuteStep={minuteStep}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
      </div>
    </>
  )
}
