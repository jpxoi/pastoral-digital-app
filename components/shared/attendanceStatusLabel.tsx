import {
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
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
    [AttendanceStatus.A_TIEMPO]: (
      <Badge variant={'green'} className='h-8 rounded-lg'>
        <IconClockCheck className='size-4' />
        <span className='text-nowrap'>A TIEMPO</span>
      </Badge>
    ),
    [AttendanceStatus.TARDANZA]: (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
        <IconClockExclamation className='size-4' />
        <span className='text-nowrap'>TARDANZA</span>
      </Badge>
    ),
    [AttendanceStatus.FALTA_INJUSTIFICADA]: (
      <Badge variant={'red'} className='h-8 rounded-lg'>
        <IconCalendarX className='size-4' />
        <span className='text-nowrap'>FALTA NO JUSTIFICADA</span>
      </Badge>
    ),
    [AttendanceStatus.TARDANZA_JUSTIFICADA]: (
      <Badge variant={'purple'} className='h-8 rounded-lg'>
        <IconClockHeart className='size-4' />
        <span className='text-nowrap'>TARDANZA JUSTIFICADA</span>
      </Badge>
    ),
    [AttendanceStatus.FALTA_JUSTIFICADA]: (
      <Badge variant={'blue'} className='h-8 rounded-lg'>
        <IconCalendarHeart className='size-4' />
        <span className='text-nowrap'>FALTA JUSTIFICADA</span>
      </Badge>
    ),
  }

  return statusMapping[status] || null
}
