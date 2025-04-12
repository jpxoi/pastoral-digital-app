'use client'

import { z } from 'zod'
import { NewAttendanceRecordFormSchema } from '@/schema'

import {
  registerAttendanceRecord,
  registerAttendanceRecords,
} from '@/actions/attendance'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useUser } from '@clerk/nextjs'

export default function EventFillAbsenteesButton({
  eventId,
}: {
  eventId: number
}) {
  const [isPending, startTransition] = useTransition()

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
    const { userId } = values

    const userIds = userId.includes(',')
      ? userId.split(',').map((id) => id.trim())
      : [userId]

    if (userIds.length > 1) {
      startTransition(() => {
        toast.promise(
          registerAttendanceRecords(
            userIds.map(
              (id) => ({
                eventId: eventId,
                userId: id,
                registeredBy: registeredBy?.id || '',
                checkInTime: new Date(),
                method: AttendanceRecordMethod.MANUAL,
                status: values.status,
              }),
              `/admin/events/${eventId}`
            )
          ),
          {
            loading: 'Registrando asistencias...',
            success: (data: { error?: string; success?: string }) => {
              if (data.error) {
                throw new Error(data.error)
              }

              if (data.success) {
                return data.success
              }
            },
            error: (error) => {
              return (
                error.message ||
                'Ha ocurrido un error al registrar las asistencias.'
              )
            },
          }
        )
      })
    } else {
      startTransition(() => {
        toast.promise(
          registerAttendanceRecord(
            {
              eventId: eventId,
              userId: values.userId,
              registeredBy: registeredBy?.id || '',
              checkInTime: new Date(),
              method: AttendanceRecordMethod.MANUAL,
              status: values.status,
            },
            `/admin/events/${eventId}`
          ),
          {
            loading: 'Registrando asistencia...',
            success: (data: { error?: string; success?: string }) => {
              if (data.error) {
                throw new Error(data.error)
              }

              if (data.success) {
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
            className='grid gap-4 py-4'
          >
            <Tabs>
              <TabsList className='grid grid-cols-2'>
                <TabsTrigger value='single'>Agregar un registro </TabsTrigger>
                <TabsTrigger value='multiple'>
                  Agregar múltiples registros
                </TabsTrigger>
              </TabsList>
              <TabsContent value='single'>
                <FormField
                  control={form.control}
                  name='userId'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-x-4'>
                      <FormLabel className='text-right'>Catequista</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ingrese el ID del catequista'
                          {...field}
                          className='col-span-3'
                        />
                      </FormControl>
                      <FormMessage className='col-span-full' />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value='multiple'>
                <FormField
                  control={form.control}
                  name='userId'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-x-4'>
                      <FormLabel className='text-right'>Catequistas</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ingrese los IDs de los catequistas'
                          {...field}
                          className='col-span-3'
                        />
                      </FormControl>
                      <FormDescription className='col-span-full'>
                        Separe los IDs con comas.
                      </FormDescription>
                      <FormMessage className='col-span-full' />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-x-4 gap-y-1'>
                  <FormLabel className='text-right'>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='col-span-3'>
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
                  <FormMessage className='col-span-full' />
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
