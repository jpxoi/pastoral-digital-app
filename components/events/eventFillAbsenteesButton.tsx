'use client'

import { fillAbsenceRecords } from '@/actions/attendance'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function EventFillAbsenteesButton({
  eventId,
}: {
  eventId: number
}) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async (eventId: number) => {
    startTransition(() => {
      toast.promise(fillAbsenceRecords(eventId), {
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
    })
  }
  return (
    <Button
      variant='destructive'
      size='sm'
      disabled={isPending}
      onClick={() => handleClick(eventId)}
    >
      Rellenar Faltas
    </Button>
  )
}
