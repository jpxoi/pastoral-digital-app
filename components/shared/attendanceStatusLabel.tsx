import {
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
  IconClockX,
} from '@tabler/icons-react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'
import { AttendanceStatus } from '@/types'

export default function AttendanceStatusLabel({
  status,
}: {
  status: AttendanceStatus
}) {
  const statusMapping: { [key: string]: JSX.Element } = {
    'A TIEMPO': (
      <Badge variant={'green'} className='h-8 rounded-lg'>
        <IconClockCheck className='size-4' />
        <span className='ml-2 text-nowrap'>A TIEMPO</span>
      </Badge>
    ),
    TARDANZA: (
      <Badge variant={'yellow'} className='h-8 rounded-lg'>
        <IconClockExclamation className='size-4' />
        <span className='ml-2 text-nowrap'>TARDANZA</span>
      </Badge>
    ),
    'DOBLE TARDANZA': (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
        <IconClockX className='size-4' />
        <span className='ml-2 text-nowrap'>DOBLE TARDANZA</span>
      </Badge>
    ),
    'FALTA INJUSTIFICADA': (
      <Badge variant={'red'} className='h-8 rounded-lg'>
        <IconCalendarX className='size-4' />
        <span className='ml-2 text-nowrap'>FALTA NO JUSTIFICADA</span>
      </Badge>
    ),
    'TARDANZA JUSTIFICADA': (
      <Badge variant={'purple'} className='h-8 rounded-lg'>
        <IconClockHeart className='size-4' />
        <span className='ml-2 text-nowrap'>TARDANZA JUSTIFICADA</span>
      </Badge>
    ),
    'FALTA JUSTIFICADA': (
      <Badge variant={'blue'} className='h-8 rounded-lg'>
        <IconCalendarHeart className='size-4' />
        <span className='ml-2 text-nowrap'>FALTA JUSTIFICADA</span>
      </Badge>
    ),
  }

  return statusMapping[status] || null
}
