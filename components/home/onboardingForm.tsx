/* eslint-disable react-hooks/incompatible-library */
'use client'

import { z } from 'zod'

import { OnboardingFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { EmailInput } from '@/components/ui/email-input'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldContent,
  FieldTitle,
} from '@/components/ui/field'
import {
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconSearch,
} from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import { useState, useTransition } from 'react'
import { UserCategory, UserRole } from '@/types'
import { registerUser } from '@/actions/user'
import { toast } from 'sonner'
import { PhoneInput } from '../ui/phone-input'
import { DatePicker } from '../ui/date-picker'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { lookupDni } from '@/actions/lookup'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const steps = [
  {
    title: 'Información Personal',
    fields: ['dni', 'firstName', 'lastName'] as (keyof z.infer<
      typeof OnboardingFormSchema
    >)[],
  },
  {
    title: 'Información de Contacto',
    fields: ['email', 'phoneNumber', 'dateOfBirth'] as (keyof z.infer<
      typeof OnboardingFormSchema
    >)[],
  },
  {
    title: 'Información Academica',
    fields: ['category', 'studentCode', 'role'] as (keyof z.infer<
      typeof OnboardingFormSchema
    >)[],
  },
]

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
  const progress = ((currentStep + 1) / steps.length) * 100

  const [allowCustomName, setAllowCustomName] = useState<boolean>(false)
  const [isLookupPending, startLookupTransition] = useTransition()
  const [isLookupSuccess, setIsLookupSuccess] = useState<boolean>(false)

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const { user } = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof OnboardingFormSchema>>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      id: userId,
      dni: '',
      firstName: '',
      lastName: '',
      email: userEmail,
      phoneNumber: '',
      dateOfBirth: undefined,
      category: undefined,
      studentCode: undefined,
      role: UserRole.MEMBER,
    },
    mode: 'onChange',
  })

  const isDniValid = (dni: string) => {
    return dni.length === 8 && /^[0-9]+$/.test(dni)
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
      toast.error('DNI inválido')
      return
    }

    startLookupTransition(async () => {
      const response = await lookupDni(dni)

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

  const handleNoDni = () => {
    setAllowCustomName(true)
    form.setValue('dni', '00000000')
  }

  const onSubmit = async (values: z.infer<typeof OnboardingFormSchema>) => {
    startTransition(async () => {
      await registerUser(values)
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
                        disabled={allowCustomName || isLookupSuccess}
                        onClick={handleNoDni}
                      >
                        No tengo DNI
                      </InputGroupButton>
                    </div>
                    <InputGroup
                      aria-disabled={allowCustomName || isLookupSuccess}
                    >
                      <InputGroupInput
                        {...field}
                        id='dni'
                        aria-invalid={fieldState.invalid}
                        placeholder='Ingrese su número de DNI'
                        autoComplete='off'
                        inputMode='tel'
                        maxLength={8}
                        disabled={allowCustomName || isLookupSuccess}
                      />
                      <InputGroupAddon align='inline-end'>
                        <InputGroupButton
                          variant='default'
                          size='sm'
                          disabled={
                            allowCustomName ||
                            isLookupSuccess ||
                            isLookupPending ||
                            !isDniValid(form.getValues('dni'))
                          }
                          onClick={handleLookupDni}
                        >
                          {isLookupPending ? (
                            <IconLoader2 className='animate-spin' />
                          ) : (
                            <IconSearch />
                          )}
                          {!isLookupPending && 'Buscar'}
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
                  <Input
                    {...field}
                    id='firstName'
                    aria-invalid={fieldState.invalid}
                    placeholder='Ingrese sus nombres'
                    autoComplete='off'
                    disabled={!allowCustomName || isLookupSuccess}
                  />
                  {allowCustomName && !isLookupSuccess && (
                    <FieldDescription>
                      Escribe tu nombre tal y como aparece en tu documento de
                      identidad.
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
                  <Input
                    {...field}
                    id='lastName'
                    aria-invalid={fieldState.invalid}
                    placeholder='Ingrese sus dos apellidos'
                    autoComplete='off'
                    disabled={!allowCustomName || isLookupSuccess}
                  />
                  {allowCustomName && !isLookupSuccess && (
                    <FieldDescription>
                      Escribe tus apellidos tal y como aparecen en tu documento
                      de identidad.
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
                    aria-invalid={fieldState.invalid}
                    placeholder=''
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
                  <DatePicker
                    id='dateOfBirth'
                    value={field.value}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    placeholder=''
                    disabled={false}
                  />
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
                const options = [
                  { label: 'Alumno', value: UserCategory.STUDENT },
                  { label: 'Exalumno', value: UserCategory.ALUMNI },
                  { label: 'Docente', value: UserCategory.TEACHER },
                ]

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
                      {options.map((item) => (
                        <FieldLabel key={item.value} htmlFor={item.value}>
                          <Field
                            orientation='horizontal'
                            data-invalid={fieldState.invalid}
                          >
                            <FieldContent>
                              <FieldTitle>{item.label}</FieldTitle>
                            </FieldContent>
                            <RadioGroupItem
                              value={item.value}
                              id={item.value}
                              aria-invalid={fieldState.invalid}
                            />
                          </Field>
                        </FieldLabel>
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
                      aria-invalid={fieldState.invalid}
                      placeholder='Ingrese su código de estudiante'
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            <Field orientation='horizontal'>
              <Checkbox
                id='confirmationCheckbox'
                checked={isConfirmed}
                onCheckedChange={(checked) =>
                  setIsConfirmed(checked as boolean)
                }
              />
              <FieldContent>
                <FieldLabel htmlFor='confirmationCheckbox'>
                  Sacramento de la confirmación
                </FieldLabel>
                <FieldDescription>
                  Doy fe de que he recibido el sacramento de la confirmación.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        )
      }

      default: {
        return null
      }
    }
  }

  return (
    <Card className='min-w-md'>
      <CardHeader className='space-y-4'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <CardTitle>{currentForm.title}</CardTitle>
            <p className='text-muted-foreground text-xs'>
              Paso {currentStep + 1} de {steps.length}
            </p>
          </div>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <form
          id='multi-form'
          onSubmit={form.handleSubmit(onSubmit)}
          className='max-w-(--breakpoint-sm) space-y-4 text-left'
        >
          {renderCurrentStepContent()}
          <Field className='justify-between' orientation='horizontal'>
            {currentStep > 0 && (
              <Button type='button' variant='ghost' onClick={handleBackButton}>
                <IconChevronLeft /> Anterior
              </Button>
            )}
            {!isLastStep && (
              <Button
                type='button'
                variant='secondary'
                onClick={handleNextButton}
              >
                Siguiente
                <IconChevronRight />
              </Button>
            )}
            {isLastStep && (
              <Button
                type='submit'
                form='multi-form'
                disabled={!isConfirmed || isPending}
              >
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
