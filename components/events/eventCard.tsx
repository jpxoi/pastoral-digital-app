import { cn } from '@/lib/utils'
import { checkRole } from '@/lib/roles'
import { getRelativeEventDate, isEventToday } from '@/lib/events'
import { FetchEventProps, UserRole } from '@/types'
import Link from 'next/link'

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

export default async function EventCard({
  record,
  type,
}: {
  record: FetchEventProps
  type: 'upcoming' | 'past'
}) {
  const isToday = type === 'upcoming' ? isEventToday(record.date) : false
  const isAdmin = await checkRole(UserRole.ADMIN)

  return (
    <Card
      key={record.id}
      className={cn('text-left', isToday ? 'border-blue-700 bg-blue-50' : '')}
    >
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <h3 className='text-lg'>{record.name}</h3>
          {type === 'upcoming' && (
            <Button
              asChild
              variant='ghost'
              size='icon'
              className='size-6 p-1 hover:bg-blue-50 hover:text-primary'
            >
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${record.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}/${record.endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}&details=&location=${record.location.name}&text=${record.name}`}
                target='_blank'
                rel='noreferrer'
                className='text-primary'
              >
                <IconCalendarPlus className='size-4' />
              </a>
            </Button>
          )}
        </CardTitle>
        <CardDescription className='space-y-0.5'>
          <span className='flex items-center gap-1 text-ellipsis'>
            <IconCalendar className='size-4' />
            <span>
              {record.date.toLocaleDateString('es-PE', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </span>
          <span className='flex items-center gap-1 text-ellipsis'>
            <IconClock className='size-4' />
            <span>
              {record.date.toLocaleTimeString('es-PE', {
                hour: 'numeric',
                minute: 'numeric',
              })}{' '}
              -{' '}
              {record.endDate.toLocaleTimeString('es-PE', {
                hour: 'numeric',
                minute: 'numeric',
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
            variant='ghost'
            disabled
            className='h-6 cursor-not-allowed px-2 py-1 text-primary hover:bg-blue-50 hover:text-primary'
          >
            Justificar Inasistencia
          </Button>
        )}
        <div className='flex gap-2'>
          {isAdmin ? (
            <Button asChild variant='link' className='h-6 p-1 text-primary'>
              <Link href={`/admin/events/${record.id}`}>Ver Asistencia</Link>
            </Button>
          ) : (
            <span className='text-sm text-muted-foreground'>
              {getRelativeEventDate(record.date)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
