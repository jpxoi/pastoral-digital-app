import { IconCheck, IconClockQuestion, IconX } from '@tabler/icons-react'
import { SundayMassStatus } from '@/types'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'

export default function SundayMassStatusLabel({
  status,
}: {
  status: SundayMassStatus
}) {
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

  return statusMapping[status] || null
}
