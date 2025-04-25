import {
  IconCalendarBolt,
  IconCross,
  IconFlame,
  IconMoodKid,
  IconPackageExport,
  IconUserStar,
} from '@tabler/icons-react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'
import { UserSchedule } from '@/types'

export default function UserScheduleLabel({
  schedule,
}: {
  schedule: UserSchedule
}) {
  const scheduleMapping: { [key: string]: JSX.Element } = {
    'full-time': (
      <Badge variant={'slate'} className='h-8 rounded-lg'>
        <IconCalendarBolt className='size-4' />
        <span className='ml-2 text-nowrap'>Completo</span>
      </Badge>
    ),
    coordinador: (
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconUserStar className='size-4' />
        <span className='ml-2 text-nowrap'>Coordinador</span>
      </Badge>
    ),
    'primera-comunion': (
      <Badge variant={'amber'} className='h-8 rounded-lg'>
        <IconCross className='size-4' />
        <span className='ml-2 text-nowrap'>Comunión</span>
      </Badge>
    ),
    confirmacion: (
      <Badge variant={'red'} className='h-8 rounded-lg'>
        <IconFlame className='size-4' />
        <span className='ml-2 text-nowrap'>Confirmación</span>
      </Badge>
    ),
    logistica: (
      <Badge variant={'purple'} className='h-8 rounded-lg'>
        <IconPackageExport className='size-4' />
        <span className='ml-2 text-nowrap'>Logística</span>
      </Badge>
    ),
    semilleros: (
      <Badge variant={'sky'} className='h-8 rounded-lg'>
        <IconMoodKid className='size-4' />
        <span className='ml-2 text-nowrap'>Semilleros</span>
      </Badge>
    ),
  }

  return scheduleMapping[schedule] || null
}
