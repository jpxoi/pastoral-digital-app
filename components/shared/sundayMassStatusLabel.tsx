'use client'

import { IconCheck, IconClockQuestion, IconX } from '@tabler/icons-react'
import { SundayMassStatus, type FetchMassesProps } from '@/types'
import { useState } from 'react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function SundayMassStatusLabel({
  status,
  verifier,
}: {
  status: SundayMassStatus
  verifier?: FetchMassesProps['verifier']
}) {
  const [open, setOpen] = useState(false)
  const statusMapping: Record<SundayMassStatus, JSX.Element> = {
    [SundayMassStatus.ACCEPTED]: (
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconCheck className='size-4' />
        <span className='text-nowrap'>Aceptado</span>
      </Badge>
    ),
    [SundayMassStatus.PENDING]: (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
        <IconClockQuestion className='size-4' />
        <span className='text-nowrap'>Pendiente</span>
      </Badge>
    ),
    [SundayMassStatus.REJECTED]: (
      <Badge variant='red' className='h-8 rounded-lg'>
        <IconX className='size-4' />
        <span className='text-nowrap'>Rechazado</span>
      </Badge>
    ),
  }

  const badge = statusMapping[status] || null

  if (!verifier || status === SundayMassStatus.PENDING) return badge

  const action = status === SundayMassStatus.ACCEPTED ? 'Aprobado' : 'Rechazado'

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type='button'
          className='focus-visible:ring-ring/50 rounded-lg outline-none focus-visible:ring-[3px]'
          onClick={(event) => {
            event.preventDefault()
            setOpen((open) => !open)
          }}
        >
          {badge}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {action} por {verifier.firstName} {verifier.lastName}
      </TooltipContent>
    </Tooltip>
  )
}
