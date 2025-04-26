import { cn } from '@/lib/utils'
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

import {
  IconCalendar,
  IconCalendarPlus,
  IconClock,
  IconMapPin,
} from '@tabler/icons-react'
import { EventJustifyModal } from './eventJustifyModal'
import { EventCardAction } from './eventCardAction'
import { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'

export default function EventCard({
  record,
  type,
}: {
  record: FetchEventProps
  type: 'upcoming' | 'past'
}) {
  const isToday =
    type === 'upcoming' ? isEventToday(new Date(record.date)) : false

  return (
    <Card
      key={record.id}
      className={cn('text-left', isToday ? 'border-blue-700 bg-blue-50' : '')}
    >
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <h3 className='truncate text-lg'>{record.name}</h3>
          {type === 'upcoming' && (
            <Button
              asChild
              variant='ghost'
              className='size-7 p-1 hover:bg-blue-50 hover:text-primary [&_svg]:size-5'
            >
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${new Date(record.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}/${new Date(record.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}&details=${record.description}&location=${record.location.name}&text=${record.name}`}
                target='_blank'
                rel='noreferrer'
                className='text-primary'
              >
                <IconCalendarPlus className='size-5' />
              </a>
            </Button>
          )}
        </CardTitle>
        <CardDescription className='space-y-0.5'>
          <span className='flex items-center gap-1 text-ellipsis'>
            <IconCalendar className='size-4' />
            <span>
              {new Date(record.date).toLocaleDateString('es-PE', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </span>
          <span className='flex items-center gap-1 text-ellipsis'>
            <IconClock className='size-4' />
            <span>
              {new Date(record.date).toLocaleTimeString('es-PE', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Lima',
              })}{' '}
              -{' '}
              {new Date(record.endDate).toLocaleTimeString('es-PE', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'America/Lima',
              })}
            </span>
          </span>
          <a
            href={record.location.googleMapsUrl}
            target='_blank'
            rel='noreferrer'
            className='flex items-start gap-1 text-ellipsis text-primary hover:underline'
          >
            <IconMapPin className='mt-0.5 size-4 min-w-4' />
            <span>{record.location.name}</span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        {type === 'upcoming' ? (
          <EventJustifyModal />
        ) : (
          <Button
            variant='link'
            disabled
            className='h-6 cursor-not-allowed p-1 text-primary hover:bg-blue-50 hover:text-primary'
          >
            Justificar Inasistencia
          </Button>
        )}
        <Suspense fallback={<Skeleton className='h-6 w-28' />}>
          <EventCardAction id={record.id} date={new Date(record.date)} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
