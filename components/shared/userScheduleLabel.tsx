import { IconCalendarBolt, IconCross, IconFlame, IconMoodKid, IconPackageExport } from '@tabler/icons-react'
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
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconCalendarBolt className='size-4' />
        <span className='ml-2 text-nowrap'>Completo</span>
      </Badge>
    ),
    comunion: (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
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
      <Badge variant={'blue'} className='h-8 rounded-lg'>
        <IconMoodKid className='size-4' />
        <span className='ml-2 text-nowrap'>Semilleros</span>
      </Badge>
    ),
  }

  return scheduleMapping[schedule] || null
}
