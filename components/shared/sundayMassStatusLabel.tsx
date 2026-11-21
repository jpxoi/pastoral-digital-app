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
      <Badge variant={'emerald'}>
        <IconCheck />
        <span>Aceptado</span>
      </Badge>
    ),
    [SundayMassStatus.PENDING]: (
      <Badge variant={'orange'}>
        <IconClockQuestion />
        <span>Pendiente</span>
      </Badge>
    ),
    [SundayMassStatus.REJECTED]: (
      <Badge variant='red'>
        <IconX />
        <span>Rechazado</span>
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
          className='focus-visible:ring-ring/50 rounded-4xl outline-none focus-visible:ring-[3px]'
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
