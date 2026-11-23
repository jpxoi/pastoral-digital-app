import { cn } from 'cn'
import { isEventToday } from '@/lib/events'
import { FetchEventProps } from '@/types'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { IconCalendarPlus, IconMapPin } from '@tabler/icons-react'
import { EventDateTime } from './eventDateTime'

export default function EventCard({ record }: { record: FetchEventProps }) {
  const isToday = isEventToday(new Date(record.date))

  const isHappeningNow =
    new Date(record.date) <= new Date() &&
    new Date(record.endDate) >= new Date()

  const calendarParams = new URLSearchParams({
    action: 'TEMPLATE',
    dates: [record.date, record.endDate]
      .map(
        (date) =>
          new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      )
      .join('/'),
    details: record.description ?? '',
    location: record.location.name,
    text: record.name,
  })

  return (
    <Card
      id={`event-${record.id}`}
      size='sm'
      className={cn(
        'h-full gap-3 text-left',
        isToday ? 'bg-blue-50/60 ring-blue-200' : '',
        isHappeningNow ? 'bg-emerald-50/60 ring-emerald-200' : ''
      )}
    >
      <CardHeader className='gap-2'>
        <div className='flex flex-wrap items-start justify-between gap-2'>
          <CardTitle className='min-w-0 flex-1 basis-40 font-semibold group-data-[size=sm]/card:text-base'>
            {record.name}
          </CardTitle>
          <span
            className={cn(
              'bg-muted inline-flex shrink-0 items-center rounded-md px-2 py-1 text-xs font-medium',
              isHappeningNow && 'bg-emerald-100 text-emerald-700',
              isToday && !isHappeningNow && 'bg-blue-100 text-blue-700'
            )}
          >
            {isHappeningNow ? 'En curso' : isToday ? 'Hoy' : 'Próximo'}
          </span>
        </div>
        <CardDescription className='flex flex-col gap-1 text-xs'>
          <EventDateTime date={record.date} endDate={record.endDate} />
          <a
            href={record.location.googleMapsUrl}
            target='_blank'
            rel='noreferrer'
            className='text-muted-foreground hover:text-primary flex items-start gap-2 hover:underline'
          >
            <IconMapPin className='mt-0.5 size-3.5 shrink-0' />
            <span>{record.location.name}</span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-auto items-start'>
        <Button
          asChild
          variant='link'
          className='text-primary h-7 gap-1.5 p-0 text-xs'
        >
          <a
            href={`https://calendar.google.com/calendar/render?${calendarParams}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <IconCalendarPlus className='size-3.5' aria-hidden='true' />
            Añadir al calendario
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
