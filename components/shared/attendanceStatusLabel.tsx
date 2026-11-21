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
      <Badge variant={'green'}>
        <IconClockCheck />
        <span>A TIEMPO</span>
      </Badge>
    ),
    [AttendanceStatus.TARDANZA]: (
      <Badge variant={'orange'}>
        <IconClockExclamation />
        <span>TARDANZA</span>
      </Badge>
    ),
    [AttendanceStatus.FALTA_INJUSTIFICADA]: (
      <Badge variant={'red'}>
        <IconCalendarX />
        <span>FALTA INJUSTIFICADA</span>
      </Badge>
    ),
    [AttendanceStatus.TARDANZA_JUSTIFICADA]: (
      <Badge variant={'purple'}>
        <IconClockHeart />
        <span>TARDANZA JUSTIFICADA</span>
      </Badge>
    ),
    [AttendanceStatus.FALTA_JUSTIFICADA]: (
      <Badge variant={'blue'}>
        <IconCalendarHeart />
        <span>FALTA JUSTIFICADA</span>
      </Badge>
    ),
  }

  return statusMapping[status] || null
}
