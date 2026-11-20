'use client'

import { fillAbsenceRecords } from '@/actions/attendance'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export default function EventFillAbsenteesButton({
  eventId,
}: {
  eventId: string
}) {
  const [isPending, setIsPending] = useState(false)

  const handleClick = (eventId: string) => {
    setIsPending(true)
    const result = fillAbsenceRecords(eventId)

    toast.promise(result, {
      loading: 'Rellenando faltas...',
      success: (data) => {
        if (data.error) {
          throw new Error(data.error)
        }

        if (data.success) {
          return data.success
        }
      },
      error: (error) => {
        return error.message || 'Ha ocurrido un error al rellenar faltas.'
      },
    })

    void result.then(
      () => setIsPending(false),
      () => setIsPending(false)
    )
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
          className='text-white'
          size='sm'
          disabled={isPending}
        >
          Rellenar Faltas
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que quieres rellenar las faltas?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción rellenará las faltas de todos los asistentes que no
            marcaron su asistencia. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            onClick={() => handleClick(eventId)}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
