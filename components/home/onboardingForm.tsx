'use client'

import { z } from 'zod'

import { OnboardingFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { IconCalendar, IconCheck } from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState, useTransition } from 'react'
import { UserCategory, UserRole } from '@/types'
import { registerUser } from '@/actions/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function OnboardingForm({
  userId,
  userUsername,
  userEmail,
}: {
  userId: string
  userUsername: string
  userEmail: string
}) {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<z.infer<typeof OnboardingFormSchema>>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      id: userId,
      firstName: '',
      lastName: '',
      nickname: '',
      username: userUsername,
      email: userEmail,
      phoneNumber: '',
      dateOfBirth: undefined,
      category: undefined,
      studentCode: '',
      role: UserRole.MEMBER,
    },
  })

  function onSubmit(values: z.infer<typeof OnboardingFormSchema>) {
    startTransition(() => {
      registerUser(values)
        .then((data: { success?: string; error?: string }) => {
          if (data?.error) {
            throw new Error(data?.error)
          }

          if (data?.success) {
            toast.success(data.success)
            router.push('/dashboard')
          }
        })
        .catch((error) => {
          toast.error(error.message)
        })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-screen-sm space-y-4 text-left'
      >
        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombres <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese sus nombres'
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription>
                  Ingresa tus nombres tal y como aparecen en tu documento de
                  identidad (DNI).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apellidos <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese sus dos apellidos'
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription>
                  Escribe tus apellidos completos, según tu DNI.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apelativo</FormLabel>
                <FormControl>
                  <Input placeholder='Apelativo' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre de usuario <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Ingrese su nombre de usuario'
                      {...field}
                      required
                      disabled
                    />
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                      <IconCheck className='size-5 text-green-500' />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Correo electrónico <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Ingrese su dirección de correo electrónico'
                      {...field}
                      required
                      disabled
                    />
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                      <IconCheck className='size-5 text-green-500' />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Número de teléfono <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground'>
                      +51
                    </div>
                    <Input
                      className='rounded-l-none'
                      placeholder='Ingrese su número de teléfono'
                      {...field}
                      required
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='dateOfBirth'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Fecha de nacimiento <span className='text-red-500'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: es })
                        ) : (
                          <span>Seleccione su fecha de nacimiento</span>
                        )}
                        <IconCalendar className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown-buttons'
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date()
                        const minAgeDate = new Date()
                        minAgeDate.setFullYear(today.getFullYear() - 14)
                        return (
                          date > minAgeDate || date < new Date('1900-01-01')
                        )
                      }}
                      fromYear={1900}
                      toYear={new Date().getFullYear() - 14}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Vínculo con la institución{' '}
                  <span className='text-red-500'>*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='text-left'>
                      <SelectValue placeholder='Seleccione su vínculo con la institución' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserCategory.STUDENT}>Alumno</SelectItem>
                    <SelectItem value={UserCategory.ALUMNI}>
                      Exalumno
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch('category') === UserCategory.STUDENT && (
          <FormField
            control={form.control}
            name='studentCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de estudiante</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingrese su código de estudiante'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ingresa tu código en el formato correspondiente (Ej. S5A01).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className='items-top flex space-x-2'>
          <Checkbox
            checked={isConfirmed}
            onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
          />
          <div className='grid gap-1.5 leading-none'>
            <label
              htmlFor='terms1'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Sacramento de la confirmación
            </label>
            <p className='text-sm text-muted-foreground'>
              Doy fe de que he recibido el sacramento de la confirmación.
            </p>
          </div>
        </div>
        <Button disabled={!isConfirmed || isPending} type='submit' className=''>
          Completar Registro
        </Button>
      </form>
    </Form>
  )
}
