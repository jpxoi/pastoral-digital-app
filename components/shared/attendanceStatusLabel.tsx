import { StatusLabel } from '@/types'
import {
  IconCalendarHeart,
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconClockHeart,
  IconClockX,
} from '@tabler/icons-react'
import type { JSX } from 'react'

export default function AttendanceStatusLabel({ status }: StatusLabel) {
  const statusMapping: { [key: string]: JSX.Element } = {
    'A TIEMPO': (
      <span className='flex max-w-fit flex-nowrap justify-start gap-1.5 rounded-lg bg-green-50 p-2 text-xs text-green-700'>
        <IconClockCheck className='size-4' />
        <span className='text-nowrap'>A TIEMPO</span>
      </span>
    ),
    TARDANZA: (
      <span className='flex max-w-fit flex-nowrap justify-start gap-1.5 rounded-lg bg-yellow-50 p-2 text-xs text-yellow-700'>
        <IconClockExclamation className='size-4' />
        <span className='text-nowrap'>TARDANZA</span>
      </span>
    ),
    'DOBLE TARDANZA': (
      <span className='flex max-w-fit flex-nowrap justify-start gap-1.5 rounded-lg bg-orange-50 p-2 text-xs text-orange-700'>
        <IconClockX className='size-4' />
        <span className='text-nowrap'>DOBLE TARDANZA</span>
      </span>
    ),
    'FALTA INJUSTIFICADA': (
      <span className='flex max-w-fit flex-nowrap items-center justify-start gap-1.5 rounded-lg bg-red-50 p-2 text-xs text-red-700'>
        <IconCalendarX className='size-4' />
        <span className='text-nowrap'>FALTA NO JUSTIFICADA</span>
      </span>
    ),
    'TARDANZA JUSTIFICADA': (
      <span className='flex max-w-fit flex-nowrap justify-start gap-1.5 rounded-lg bg-purple-50 p-2 text-xs text-purple-700'>
        <IconClockHeart className='size-4' />
        <span className='text-nowrap'>TARDANZA JUSTIFICADA</span>
      </span>
    ),
    'FALTA JUSTIFICADA': (
      <span className='flex max-w-fit flex-nowrap justify-start gap-1.5 rounded-lg bg-blue-50 p-2 text-xs text-blue-700'>
        <IconCalendarHeart className='size-4' />
        <span className='text-nowrap'>FALTA JUSTIFICADA</span>
      </span>
    ),
  }

  return statusMapping[status] || null
}
