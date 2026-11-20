'use client'

import { z } from 'zod'
import { NewAttendanceRecordFormSchema } from '@/schema'

import { registerAttendanceRecord } from '@/actions/attendance'
import { Button } from '@/components/ui/button'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AttendanceRecordMethod, AttendanceStatus } from '@/types'
import { useUser } from '@clerk/nextjs'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { IconCheck, IconSelector } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

type CatechistOption = {
  id: string
  firstName: string
  lastName: string
  studentCode: string | null
}

export default function EventAddRecordButton({
  eventId,
  catechists,
}: {
  eventId: string
  catechists: CatechistOption[]
}) {
  const [isPending, startTransition] = useTransition()
  const [isCatechistPickerOpen, setIsCatechistPickerOpen] = useState(false)
  const [catechistSearch, setCatechistSearch] = useState('')

  const { user: registeredBy, isLoaded } = useUser()

  const form = useForm<z.infer<typeof NewAttendanceRecordFormSchema>>({
    resolver: zodResolver(NewAttendanceRecordFormSchema),
    defaultValues: {
      userId: '',
      status: undefined,
    },
  })

  const onSubmit = async (
    values: z.infer<typeof NewAttendanceRecordFormSchema>
  ) => {
    startTransition(() => {
      toast.promise(
        registerAttendanceRecord({
          eventId,
          userId: values.userId,
          registeredBy: registeredBy?.id || '',
          checkInTime: new Date(),
          method: AttendanceRecordMethod.MANUAL,
          status: values.status,
        }),
        {
          loading: 'Registrando asistencia...',
          success: (data: { error?: string; success?: string }) => {
            if (data.error) {
              throw new Error(data.error)
            }

            if (data.success) {
              form.reset({ userId: '', status: undefined })
              return data.success
            }
          },
          error: (error) => {
            return (
              error.message ||
              'Ha ocurrido un error al registrar la asistencia.'
            )
          },
        }
      )
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' disabled={isPending || !isLoaded}>
          Agregar Registro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Registro</DialogTitle>
          <DialogDescription>
            Agrega un nuevo registro de asistencia para este evento.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-5 py-4'
          >
            <FormField
              control={form.control}
              name='userId'
              render={({ field }) => {
                const selectedCatechist = catechists.find(
                  (catechist) => catechist.id === field.value
                )

                return (
                  <FormItem className='grid gap-2'>
                    <FormLabel>Catequista</FormLabel>
                    <Popover
                      open={isCatechistPickerOpen}
                      modal
                      onOpenChange={(open) => {
                        setIsCatechistPickerOpen(open)
                        if (open) setCatechistSearch('')
                      }}
                    >
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            type='button'
                            variant='outline'
                            role='combobox'
                            aria-expanded={isCatechistPickerOpen}
                            className='w-full justify-between font-normal'
                          >
                            <span className='truncate'>
                              {selectedCatechist
                                ? `${selectedCatechist.firstName} ${selectedCatechist.lastName}${selectedCatechist.studentCode ? ` · ${selectedCatechist.studentCode}` : ''}`
                                : 'Seleccionar catequista'}
                            </span>
                            <IconSelector className='ml-2 size-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent
                        align='start'
                        className='w-(--radix-popover-trigger-width) p-0'
                      >
                        <Command>
                          <CommandInput
                            value={catechistSearch}
                            onValueChange={setCatechistSearch}
                            placeholder='Buscar catequista...'
                          />
                          <CommandList>
                            <CommandEmpty>
                              No se encontraron catequistas.
                            </CommandEmpty>
                            <CommandGroup>
                              {catechists.map((catechist) => {
                                const name = `${catechist.firstName} ${catechist.lastName}`
                                const searchValue = `${name} ${catechist.studentCode ?? ''}`

                                return (
                                  <CommandItem
                                    key={catechist.id}
                                    value={searchValue}
                                    onSelect={() => {
                                      field.onChange(catechist.id)
                                      setIsCatechistPickerOpen(false)
                                    }}
                                  >
                                    <IconCheck
                                      className={cn(
                                        'mr-2 size-4',
                                        field.value === catechist.id
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    <span className='min-w-0 flex-1 truncate'>
                                      {name}
                                    </span>
                                    {catechist.studentCode && (
                                      <span className='text-muted-foreground ml-2 text-xs'>
                                        {catechist.studentCode}
                                      </span>
                                    )}
                                  </CommandItem>
                                )
                              })}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='grid gap-2'>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleccione el estado' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(AttendanceStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' size='sm' disabled={isPending || !isLoaded}>
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
