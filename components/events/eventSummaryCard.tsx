import type { ReactNode } from 'react'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconCalendar, IconMapPin } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import type { SelectEvent, SelectLocation } from '@/db/schema'

type EventSummary = SelectEvent & {
  location?: Pick<SelectLocation, 'name' | 'googleMapsUrl'> | null
}

export default function EventSummaryCard({
  event,
  action,
}: {
  event: EventSummary
  action?: ReactNode
}) {
  return (
    <Card size='sm' className='w-full gap-3 text-left'>
      <CardHeader className='gap-2'>
        {action && <CardAction>{action}</CardAction>}
        <CardTitle className='text-base font-semibold group-data-[size=sm]/card:text-base'>
          {event.name}
        </CardTitle>
        <CardDescription className='flex flex-col gap-1 text-sm'>
          <span className='flex items-center gap-2'>
            <IconCalendar className='size-4 shrink-0' />
            <span>
              {format(new Date(event.date), 'PPP', {
                locale: es,
                in: tz('America/Lima'),
              })}{' '}
              ·{' '}
              {format(new Date(event.date), 'p', {
                locale: es,
                in: tz('America/Lima'),
              })}{' '}
              -{' '}
              {format(new Date(event.endDate), 'p', {
                locale: es,
                in: tz('America/Lima'),
              })}
            </span>
          </span>
          {event.location && (
            <a
              href={event.location.googleMapsUrl}
              target='_blank'
              rel='noreferrer'
              className='text-muted-foreground hover:text-primary flex items-start gap-2 hover:underline'
            >
              <IconMapPin className='mt-0.5 size-4 shrink-0' />
              <span>{event.location.name}</span>
            </a>
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
