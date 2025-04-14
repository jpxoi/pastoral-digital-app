import { IconCheck, IconClockQuestion } from '@tabler/icons-react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'

export default function SundayMassStatusLabel({
  verified,
}: {
  verified: string
}) {
  const categoryMapping: { [key: string]: JSX.Element } = {
    verificado: (
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconCheck className='size-4' />
        <span className='ml-2 text-nowrap'>Verificado</span>
      </Badge>
    ),
    pendiente: (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
        <IconClockQuestion className='size-4' />
        <span className='ml-2 text-nowrap'>Pendiente</span>
      </Badge>
    ),
  }

  return categoryMapping[verified] || null
}
