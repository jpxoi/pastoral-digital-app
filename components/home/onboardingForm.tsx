'use client'

import { z } from 'zod'

import { onboardingFormSchema } from '@/schema'
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
import { useState } from 'react'

export default function OnboardingForm({
  userId,
  userFirstName,
  userLastName,
  userUsername,
  userEmail,
}: {
  userId: string
  userFirstName: string
  userLastName: string
  userUsername: string
  userEmail: string
}) {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      id: userId,
      firstName: userFirstName,
      lastName: userLastName,
      nickname: '',
      username: userUsername,
      email: userEmail,
      phoneNumber: '',
      dateOfBirth: undefined,
      category: undefined,
      studentCode: '',
      role: 'member',
    },
  })

  function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder='Nombres completo' {...field} required />
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
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Apellidos completos'
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Username'
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
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='Correo Electrónico'
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
                <FormLabel>Número de Teléfono</FormLabel>
                <FormControl>
                  <div className='flex'>
                    <div className='flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-muted-foreground'>
                      +51
                    </div>
                    <Input
                      className='rounded-l-none'
                      placeholder='Número de teléfono'
                      {...field}
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
                <FormLabel>Fecha de Nacimiento</FormLabel>
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
                          <span>Selecciona tu fecha de nacimiento</span>
                        )}
                        <IconCalendar className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown-buttons'
                      selected={field.value}
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
                <FormLabel>Vínculo con la institución</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='text-left'>
                      <SelectValue placeholder='Selecciona tu vínculo con la institución' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='student'>Alumno</SelectItem>
                    <SelectItem value='alumni'>Exalumno</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.watch('category') === 'student' && (
          <FormField
            control={form.control}
            name='studentCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Estudiante</FormLabel>
                <FormControl>
                  <Input placeholder='Código de Estudiante' {...field} />
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
              Sacramento de la Confirmación
            </label>
            <p className='text-sm text-muted-foreground'>
              Doy fe de que he recibido el sacramento de la confirmación.
            </p>
          </div>
        </div>

        <Button disabled={!isConfirmed} type='submit' className=''>
          Completar Registro
        </Button>
      </form>
    </Form>
  )
}
