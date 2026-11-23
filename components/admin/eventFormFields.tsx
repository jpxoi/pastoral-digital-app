'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { useId } from 'react'
import { format, parseISO } from 'date-fns'
import { IconInfoCircle } from '@tabler/icons-react'
import { z } from 'zod'
import { UpdateEventFormSchema } from '@/schema'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'
import { Input } from '@/components/ui/input'
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
  const formId = useId()
  const form = useFormContext<EventFieldsValues>()
  return (
    <>
      <Controller
        control={form.control}
        name='name'
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            className='min-w-0 gap-2 text-left'
          >
            <FieldLabel
              htmlFor={`${formId}-${field.name}`}
              className='block w-full text-left'
            >
              Nombre del evento
            </FieldLabel>
            <Input
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.invalid ? `${formId}-${field.name}-error` : undefined
              }
              disabled={form.formState.isSubmitting}
              placeholder='Ej. Encuentro de catequesis'
              autoFocus
              {...field}
            />
            {fieldState.invalid && (
              <FieldError
                id={`${formId}-${field.name}-error`}
                errors={[fieldState.error]}
              />
            )}
          </Field>
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
            <Controller
              control={form.control}
              name='firstTurnDate'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Fecha del primer turno
                  </FieldLabel>
                  <DatePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
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
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='firstTurnTime'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Hora del primer turno
                  </FieldLabel>
                  <TimePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
                    disabled={form.formState.isSubmitting}
                    {...field}
                    minuteStep={minuteStep}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
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
            <Controller
              control={form.control}
              name='secondTurnDate'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Fecha del segundo turno
                  </FieldLabel>
                  <DatePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
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
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='secondTurnTime'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Hora del segundo turno
                  </FieldLabel>
                  <TimePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
                    disabled={form.formState.isSubmitting}
                    {...field}
                    minuteStep={minuteStep}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>
        </section>

        <section className='flex min-w-0 flex-col gap-3'>
          <h3 className='text-sm font-semibold'>Fin del evento</h3>
          <div className='grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,7rem)] gap-3'>
            <Controller
              control={form.control}
              name='endDate'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Fecha de fin del evento
                  </FieldLabel>
                  <DatePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
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
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='endTime'
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className='min-w-0 gap-2 text-left'
                >
                  <FieldLabel
                    htmlFor={`${formId}-${field.name}`}
                    className='sr-only'
                  >
                    Hora de fin del evento
                  </FieldLabel>
                  <TimePicker
                    id={`${formId}-${field.name}`}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      fieldState.invalid
                        ? `${formId}-${field.name}-error`
                        : undefined
                    }
                    disabled={form.formState.isSubmitting}
                    {...field}
                    minuteStep={minuteStep}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      id={`${formId}-${field.name}-error`}
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </div>
        </section>
      </div>
    </>
  )
}
