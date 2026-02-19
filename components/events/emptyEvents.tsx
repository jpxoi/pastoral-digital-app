import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty'
import { IconCalendarOff } from '@tabler/icons-react'

export default function EmptyEvents({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <Empty className='bg-muted/30 col-span-full h-full rounded-lg'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconCalendarOff />
        </EmptyMedia>
        <EmptyTitle>{title || 'No hay eventos programados'}</EmptyTitle>
        <EmptyDescription className='max-w-xs text-pretty'>
          {description ||
            'No hay eventos programados en este momento. Por favor verifica más tarde.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
