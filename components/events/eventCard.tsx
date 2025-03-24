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

import { IconCalendar, IconClock, IconMapPin } from '@tabler/icons-react'

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
        <CardTitle className='text-lg'>{record.name}</CardTitle>
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
              })}
            </span>
          </span>
          <a
            href={record.location.googleMapsUrl}
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-1 text-ellipsis text-primary hover:underline'
          >
            <IconMapPin className='size-4' /> {record.location.name}
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        {type === 'upcoming' ? (
          <span
            className={cn(
              'text-sm',
              isToday ? 'text-blue-700' : 'text-neutral-500'
            )}
          >
            {getRelativeEventDate(record.date)}
          </span>
        ) : (
          <span className='text-sm text-neutral-500'>Evento pasado</span>
        )}
        {type === 'upcoming' && (
          <Button asChild variant='link' className='h-6 p-0'>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${record.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}/${record.endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'}&details=&location=${record.location.name}&text=${record.name}`}
              target='_blank'
              rel='noreferrer'
              className='text-primary underline-offset-4 hover:underline'
            >
              Agregar a calendario
            </a>
          </Button>
        )}
        {isAdmin && type === 'past' ? (
          <Button asChild variant='link' className='h-6 p-0'>
            <Link href={`/admin/events/${record.id}`}>Ver asistencia</Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
