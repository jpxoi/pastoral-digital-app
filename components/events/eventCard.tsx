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

export default function EventCard({ record }: { record: FetchEventProps }) {
  const isToday = isEventToday(new Date(record.date))

  const isHappeningNow =
    new Date(record.date) <= new Date() &&
    new Date(record.endDate) >= new Date()

  return (
    <Card
      size='sm'
      className={cn(
        'h-full gap-3 text-left',
        isToday
          ? 'bg-blue-50/60 ring-blue-200 dark:bg-blue-950/20 dark:ring-blue-900'
          : '',
        isHappeningNow
          ? 'bg-emerald-50/60 ring-emerald-200 dark:bg-emerald-950/20 dark:ring-emerald-900'
          : ''
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
              isHappeningNow &&
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
              isToday &&
                !isHappeningNow &&
                'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
            )}
          >
            {isHappeningNow ? 'En curso' : isToday ? 'Hoy' : 'Próximo'}
          </span>
        </div>
        <CardDescription className='flex flex-col gap-1 text-xs'>
          <span className='flex items-center gap-2'>
            <IconCalendar className='size-3.5 shrink-0' />
            <span>
              {format(record.date, 'PPP', {
                locale: es,
                in: tz('America/Lima'),
              })}
            </span>
          </span>
          <span className='flex items-center gap-2'>
            <IconClock className='size-3.5 shrink-0' />
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
            className='text-muted-foreground hover:text-primary flex items-start gap-2 hover:underline'
          >
            <IconMapPin className='mt-0.5 size-3.5 shrink-0' />
            <span>{record.location.name}</span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-auto flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-1'>
          <Button
            asChild
            variant='ghost'
            className='hover:text-primary size-7 p-1 hover:bg-blue-50 [&_svg]:size-5'
          >
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${new Date(record.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}/${new Date(record.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}&details=${record.description}&location=${record.location.name}&text=${record.name}`}
              target='_blank'
              rel='noreferrer'
              className='text-muted-foreground'
              aria-label='Añadir evento a Google Calendar'
            >
              <IconCalendarPlus className='size-5' />
            </a>
          </Button>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {!isHappeningNow && (
            <a
              href={new URL(
                `https://wa.me/51936523900?text=Hola, me gustaría justificar mi inasistencia al evento ${record.name}, a realizarse el ${format(
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
                'text-primary h-7 px-1 text-xs'
              )}
            >
              Justificar Inasistencia
            </a>
          )}
          <Suspense fallback={<Skeleton className='h-6 w-28' />}>
            <EventCardAction id={record.id} date={new Date(record.date)} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  )
}
