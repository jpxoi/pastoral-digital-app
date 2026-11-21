/* eslint-disable react-hooks/incompatible-library */
'use client'

import { z } from 'zod'

import { OnboardingFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type SubmitErrorHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { EmailInput } from '@/components/ui/email-input'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field'
import {
  IconCircleCheck,
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconSearch,
} from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { BirthDateInput } from '@/components/ui/birth-date-input'
import { useEffect, useState, useTransition } from 'react'
import { normalizeStudentCode } from '@/lib/student-code'
import { UserCategory, UserRole } from '@/types'
import { registerUser } from '@/actions/user'
import { toast } from 'sonner'
import { PhoneInput } from '../ui/phone-input'
import { RadioGroup } from '../ui/radio-group'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { UserCategoryFilterOptions } from '@/lib/filter'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { lookupDni } from '@/actions/lookup'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const steps = [
  {
    title: 'Información Personal',
    fields: ['dni', 'firstName', 'lastName'] as (keyof z.input<
      typeof OnboardingFormSchema
    >)[],
  },
  {
    title: 'Información de Contacto',
    fields: ['email', 'phoneNumber', 'dateOfBirth'] as (keyof z.input<
      typeof OnboardingFormSchema
    >)[],
  },
  {
    title: 'Información Académica',
    fields: ['category', 'studentCode'] as (keyof z.input<
      typeof OnboardingFormSchema
    >)[],
  },
]

function describeDateInput(value: string | undefined) {
  if (!value || !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return null
  const [day, month, year] = value.split('/').map(Number)
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  )
    return null
  return new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export default function OnboardingForm({
  userId,
  userEmail,
}: {
  userId: string
  userEmail: string
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const currentForm = steps[currentStep]

  const isLastStep = currentStep === steps.length - 1

  const [allowCustomName, setAllowCustomName] = useState<boolean>(false)
  const [isNoDni, setIsNoDni] = useState(false)
  const [isLookupPending, startLookupTransition] = useTransition()
  const [isLookupSuccess, setIsLookupSuccess] = useState<boolean>(false)

  const [isPending, startTransition] = useTransition()

  const { user } = useUser()
  const router = useRouter()

  const form = useForm<
    z.input<typeof OnboardingFormSchema>,
    unknown,
    z.output<typeof OnboardingFormSchema>
  >({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      id: userId,
      dni: '',
      firstName: '',
      lastName: '',
      email: userEmail,
      phoneNumber: '',
      dateOfBirth: '',
      category: undefined,
      studentCode: undefined,
      role: UserRole.MEMBER,
    },
    mode: 'onChange',
  })

  const isDniValid = (dni: string) => dni.length === 8 && /^\d+$/.test(dni)

  const [errorFieldToFocus, setErrorFieldToFocus] = useState<
    keyof z.input<typeof OnboardingFormSchema> | null
  >(null)

  useEffect(() => {
    if (errorFieldToFocus) {
      form.setFocus(errorFieldToFocus)
      setErrorFieldToFocus(null)
    }
  }, [currentStep, errorFieldToFocus, form])

  const onInvalid: SubmitErrorHandler<z.input<typeof OnboardingFormSchema>> = (
    errors
  ) => {
    const stepIndex = steps.findIndex((step) =>
      step.fields.some((field) => errors[field])
    )
    if (stepIndex === -1) return
    const field = steps[stepIndex].fields.find((field) => errors[field])
    setCurrentStep(stepIndex)
    setErrorFieldToFocus(field ?? null)
  }

  const handleNextButton = async () => {
    const currentFields = steps[currentStep].fields

    const isValid = await form.trigger(currentFields)

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleLookupDni = async () => {
    const dni = form.getValues('dni')
    if (!dni) return

    if (!isDniValid(dni)) {
      form.setError('dni', {
        type: 'manual',
        message: 'Ingresa un DNI válido de 8 dígitos.',
      })
      return
    }

    form.clearErrors('dni')
    startLookupTransition(async () => {
      let response: Awaited<ReturnType<typeof lookupDni>>
      try {
        response = await lookupDni(dni)
      } catch {
        response = {
          success: false,
          error: 'No se pudo consultar el DNI. Ingresa tus datos manualmente.',
        }
      }

      if (response.success && response.data) {
        form.setValue('firstName', response.data.firstName)
        form.setValue('lastName', response.data.lastName)

        setAllowCustomName(false)
        setIsLookupSuccess(true)

        toast.success('DNI encontrado, se han autocompletado los campos.')
      } else {
        toast.error(response.error)

        setAllowCustomName(true)
      }
    })
  }

  const resetDniFlow = () => {
    form.resetField('dni')
    form.resetField('firstName')
    form.resetField('lastName')
    setAllowCustomName(false)
    setIsNoDni(false)
    setIsLookupSuccess(false)
    setCurrentStep(0)
  }

  const handleDniModeButton = () => {
    if (isLookupSuccess) {
      resetDniFlow()
      return
    }

    if (isNoDni) {
      form.resetField('dni')
      form.resetField('firstName')
      form.resetField('lastName')
      setAllowCustomName(false)
      setIsNoDni(false)
      return
    }

    form.resetField('dni')
    form.resetField('firstName')
    form.resetField('lastName')
    setAllowCustomName(true)
    setIsNoDni(true)
  }

  const onSubmit = async (values: z.output<typeof OnboardingFormSchema>) => {
    startTransition(async () => {
      await registerUser({
        id: values.id,
        dni: values.dni,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        category: values.category,
        studentCode: values.studentCode,
        role: values.role,
      })
        .then(async (data: { success?: string; error?: string }) => {
          if (data?.error) {
            throw new Error(data?.error)
          }

          if (data?.success) {
            await user?.reload()
            toast.success(data.success)
            router.push('/dashboard')
          }
        })
        .catch((error) => {
          toast.error(error.message)
        })
    })
  }

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FieldGroup key='step-0'>
            <div
              id='dni-lookup'
              className='grid items-center gap-4 sm:grid-cols-5'
            >
              <Controller
                control={form.control}
                name='dni'
                render={({ field, fieldState }) => (
                  <Field className='col-span-full'>
                    <div className='flex items-center justify-between'>
                      <FieldLabel htmlFor='dni'>DNI</FieldLabel>
                      <InputGroupButton
                        variant='link'
                        size='xs'
                        className='h-auto px-0 text-xs'
                        disabled={isLookupPending}
                        onClick={handleDniModeButton}
                      >
                        {isLookupSuccess
                          ? 'No son mis datos'
                          : isNoDni
                            ? 'Tengo DNI'
                            : 'No tengo DNI'}
                      </InputGroupButton>
                    </div>
                    <InputGroup
                      aria-disabled={
                        isNoDni || isLookupSuccess || isLookupPending
                      }
                    >
                      <InputGroupInput
                        {...field}
                        id='dni'
                        value={field.value ?? ''}
                        aria-invalid={fieldState.invalid}
                        type='text'
                        placeholder='Número de DNI'
                        autoComplete='off'
                        inputMode='numeric'
                        pattern='[0-9]{8}'
                        maxLength={8}
                        className='text-base tabular-nums md:text-sm'
                        disabled={isNoDni || isLookupSuccess || isLookupPending}
                        onChange={(event) => {
                          field.onChange(
                            event.target.value.replace(/\D/g, '').slice(0, 8)
                          )
                          form.clearErrors('dni')
                        }}
                      />
                      <InputGroupAddon align='inline-end' className='shrink-0'>
                        <InputGroupButton
                          variant='ghost'
                          size='sm'
                          className='text-primary hover:bg-primary/10 hover:text-primary disabled:text-muted-foreground h-7 rounded-sm px-2 text-sm disabled:opacity-60'
                          disabled={
                            isNoDni ||
                            isLookupSuccess ||
                            isLookupPending ||
                            !/[0-9]/.test(field.value ?? '')
                          }
                          onClick={handleLookupDni}
                        >
                          {isLookupPending ? (
                            <IconLoader2 className='animate-spin' />
                          ) : (
                            <IconSearch />
                          )}
                          {isLookupPending ? 'Buscando...' : 'Buscar'}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name='firstName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor='firstName'
                    aria-invalid={fieldState.invalid}
                  >
                    Nombres
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='firstName'
                      aria-invalid={fieldState.invalid}
                      placeholder='Ingrese sus nombres'
                      autoComplete='off'
                      readOnly={isLookupSuccess}
                      disabled={!allowCustomName && !isLookupSuccess}
                    />
                    {isLookupSuccess && (
                      <InputGroupAddon align='inline-end'>
                        <IconCircleCheck
                          className='size-4 text-emerald-600'
                          aria-hidden='true'
                        />
                        <span className='sr-only'>Identidad verificada</span>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  {allowCustomName && !isLookupSuccess && (
                    <FieldDescription>
                      Tal como figura en tu documento.
                    </FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='lastName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor='lastName'
                    aria-invalid={fieldState.invalid}
                  >
                    Apellidos
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='lastName'
                      aria-invalid={fieldState.invalid}
                      placeholder='Ingrese sus dos apellidos'
                      autoComplete='off'
                      readOnly={isLookupSuccess}
                      disabled={!allowCustomName && !isLookupSuccess}
                    />
                    {isLookupSuccess && (
                      <InputGroupAddon align='inline-end'>
                        <IconCircleCheck
                          className='size-4 text-emerald-600'
                          aria-hidden='true'
                        />
                        <span className='sr-only'>Identidad verificada</span>
                      </InputGroupAddon>
                    )}
                  </InputGroup>
                  {allowCustomName && !isLookupSuccess && (
                    <FieldDescription>
                      Tal como figura en tu documento.
                    </FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )
      case 1: {
        return (
          <FieldGroup key='step-1'>
            <Controller
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email' aria-invalid={fieldState.invalid}>
                    Correo electrónico
                  </FieldLabel>

                  <EmailInput
                    {...field}
                    id='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='Ingrese su dirección de correo electrónico'
                    autoComplete='off'
                    disabled
                  />
                  <FieldDescription>
                    No puedes modificar tu correo una vez registrado.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='phoneNumber'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor='phoneNumber'
                    aria-invalid={fieldState.invalid}
                  >
                    Número de teléfono
                  </FieldLabel>

                  <PhoneInput
                    {...field}
                    id='phoneNumber'
                    type='tel'
                    inputMode='tel'
                    aria-invalid={fieldState.invalid}
                    placeholder='912 345 678'
                    autoComplete='off'
                    defaultCountry='PE'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name='dateOfBirth'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor='dateOfBirth'
                    aria-invalid={fieldState.invalid}
                  >
                    Fecha de nacimiento
                  </FieldLabel>
                  <BirthDateInput
                    {...field}
                    id='dateOfBirth'
                    aria-invalid={fieldState.invalid}
                    aria-describedby={
                      describeDateInput(field.value)
                        ? 'dateOfBirth-description'
                        : undefined
                    }
                  />
                  {describeDateInput(field.value) && (
                    <FieldDescription
                      id='dateOfBirth-description'
                      aria-live='polite'
                      className='-mt-1! text-xs leading-snug'
                    >
                      {describeDateInput(field.value)}
                    </FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )
      }

      case 2: {
        return (
          <FieldGroup key='step-2'>
            <Controller
              name='category'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend>Relación con el colegio</FieldLegend>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      disabled={false}
                    >
                      {/* Los docentes se ajustan directamente en la base de datos por temas de seguridad. */}
                      {UserCategoryFilterOptions.filter(
                        (item) => item.value !== UserCategory.TEACHER
                      ).map((item) => (
                        <RadioGroupPrimitive.Item
                          key={item.value}
                          value={item.value}
                          aria-invalid={fieldState.invalid}
                          className='border-input text-foreground hover:bg-muted/50 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 data-[state=checked]:text-primary focus-visible:ring-ring flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
                        >
                          <item.icon
                            className='size-5 shrink-0'
                            aria-hidden='true'
                          />
                          {item.label}
                        </RadioGroupPrimitive.Item>
                      ))}
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )
              }}
            />
            {form.watch('category') === UserCategory.STUDENT && (
              <Controller
                control={form.control}
                name='studentCode'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='studentCode'>
                      Código de estudiante
                    </FieldLabel>
                    <Input
                      {...field}
                      id='studentCode'
                      value={field.value ?? ''}
                      onChange={(event) =>
                        field.onChange(event.target.value.toUpperCase())
                      }
                      onBlur={(event) => {
                        field.onChange(normalizeStudentCode(event.target.value))
                        field.onBlur()
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder='Ej. P6A01 o S5B01'
                      autoComplete='off'
                    />
                    <FieldDescription>
                      Código de 5 caracteres, por ejemplo S5B01.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldGroup>
        )
      }

      default: {
        return null
      }
    }
  }

  return (
    <Card className='w-full max-w-lg shrink-0 rounded-2xl shadow-xl max-md:-mx-6 max-md:w-[calc(100%+3rem)] max-md:max-w-none max-md:rounded-none max-md:bg-transparent max-md:py-0 max-md:shadow-none max-md:ring-0'>
      <CardHeader className='gap-3'>
        <div className='flex items-center justify-between gap-4'>
          <CardTitle className='text-base leading-snug'>
            {currentForm.title}
          </CardTitle>
          <span className='text-muted-foreground shrink-0 text-xs tabular-nums'>
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <div
          role='progressbar'
          aria-label='Progreso del registro'
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-valuenow={currentStep + 1}
          aria-valuetext={`Paso ${currentStep + 1} de ${steps.length}: ${currentForm.title}`}
          className='flex gap-1.5'
        >
          {steps.map((step, index) => (
            <span
              key={step.title}
              className={`h-1 flex-1 rounded-full transition-colors ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <form
          id='multi-form'
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className='w-full space-y-4 text-left'
        >
          {renderCurrentStepContent()}
          <Field className='justify-end' orientation='horizontal'>
            {currentStep > 0 && (
              <Button
                type='button'
                variant='ghost'
                className='mr-auto'
                onClick={handleBackButton}
              >
                <IconChevronLeft /> Anterior
              </Button>
            )}
            {!isLastStep && (
              <Button type='button' onClick={handleNextButton}>
                Siguiente
                <IconChevronRight />
              </Button>
            )}
            {isLastStep && (
              <Button type='submit' form='multi-form' disabled={isPending}>
                {isPending ? (
                  <IconLoader2 className='animate-spin' />
                ) : (
                  'Registrarme'
                )}
              </Button>
            )}
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}
