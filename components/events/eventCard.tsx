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
import { Button, buttonVariants } from '@/components/ui/button'

import {
  IconCalendar,
  IconCalendarPlus,
  IconClock,
  IconMapPin,
} from '@tabler/icons-react'
import { EventCardAction } from './eventCardAction'
import { Suspense } from 'react'
import { Skeleton } from '../ui/skeleton'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'

export default function EventCard({
  record,
  type,
}: {
  record: FetchEventProps
  type: 'upcoming' | 'past'
}) {
  const isToday =
    type === 'upcoming' ? isEventToday(new Date(record.date)) : false

  const isHappeningNow =
    new Date(record.date) <= new Date() &&
    new Date(record.endDate) >= new Date()

  return (
    <Card
      key={record.id}
      className={cn(
        'text-left',
        isToday ? 'border-blue-700 bg-blue-50' : '',
        isHappeningNow ? 'border-emerald-700 bg-emerald-50' : ''
      )}
    >
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <h3 className='truncate text-lg'>{record.name}</h3>
          {type === 'upcoming' && (
            <Button
              asChild
              variant='ghost'
              className='hover:text-primary size-7 p-1 hover:bg-blue-50 [&_svg]:size-5'
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
              {format(record.date, 'PPP', {
                locale: es,
                in: tz('America/Lima'),
              })}
            </span>
          </span>
          <span className='flex items-center gap-1 text-ellipsis'>
            <IconClock className='size-4' />
            <span>
              {format(record.date, 'p', {
                locale: es,
                in: tz('America/Lima'),
              })}{' '}
              -{' '}
              {format(record.endDate, 'p', {
                locale: es,
                in: tz('America/Lima'),
              })}
            </span>
          </span>
          <a
            href={record.location.googleMapsUrl}
            target='_blank'
            rel='noreferrer'
            className='text-primary flex items-start gap-1 text-ellipsis hover:underline'
          >
            <IconMapPin className='mt-0.5 size-4 min-w-4' />
            <span>{record.location.name}</span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        {isHappeningNow || type === 'past' ? (
          <Button
            variant='link'
            disabled
            className='text-primary hover:text-primary h-6 cursor-not-allowed p-1 hover:bg-blue-50'
          >
            {isHappeningNow ? 'Evento en curso' : 'Evento finalizado'}
          </Button>
        ) : (
          <a
            href={new URL(
              `https://wa.me/51941952314?text=Hola, me gustaría justificar mi inasistencia al evento ${record.name}, a realizarse el ${format(
                record.date,
                'PPP',
                {
                  locale: es,
                  in: tz('America/Lima'),
                }
              )} a las ${format(record.date, 'p', {
                locale: es,
                in: tz('America/Lima'),
              })}`
            ).toString()}
            target='_blank'
            rel='noreferrer'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-primary hover:text-primary h-6 p-1 hover:bg-blue-50'
            )}
          >
            Justificar Inasistencia
          </a>
        )}
        <Suspense fallback={<Skeleton className='h-6 w-28' />}>
          <EventCardAction id={record.id} date={new Date(record.date)} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
