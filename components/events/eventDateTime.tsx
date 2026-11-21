import { IconCalendar, IconClock } from '@tabler/icons-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import type { SelectEvent } from '@/db/schema'
import { Skeleton } from '@/components/ui/skeleton'

export function EventDateTime({
  date,
  endDate,
  size = 'sm',
}: Pick<SelectEvent, 'date' | 'endDate'> & { size?: 'sm' | 'default' }) {
  const iconClassName = size === 'sm' ? 'size-3.5 shrink-0' : 'size-4 shrink-0'
  const start = new Date(date)
  const end = new Date(endDate)

  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
      <span className='inline-flex items-center gap-2'>
        <IconCalendar className={iconClassName} aria-hidden='true' />
        <time dateTime={start.toISOString()}>
          {format(start, 'PPP', { locale: es, in: tz('America/Lima') })}
        </time>
      </span>
      <span className='inline-flex items-center gap-2 whitespace-nowrap tabular-nums'>
        <IconClock className={iconClassName} aria-hidden='true' />
        <span>
          <time dateTime={start.toISOString()}>
            {format(start, 'HH:mm', { in: tz('America/Lima') })}
          </time>
          {' - '}
          <time dateTime={end.toISOString()}>
            {format(end, 'HH:mm', { in: tz('America/Lima') })}
          </time>
        </span>
      </span>
    </div>
  )
}

export function EventDateTimeSkeleton({
  size = 'sm',
}: {
  size?: 'sm' | 'default'
}) {
  return (
    <div
      aria-hidden='true'
      className='flex flex-wrap items-center gap-x-4 gap-y-1'
    >
      <div className='flex items-center gap-2'>
        <Skeleton
          className={size === 'sm' ? 'size-3.5 shrink-0' : 'size-4 shrink-0'}
        />
        <Skeleton className={size === 'sm' ? 'h-4 w-44' : 'h-5 w-56'} />
      </div>
      <div className='flex items-center gap-2'>
        <Skeleton
          className={size === 'sm' ? 'size-3.5 shrink-0' : 'size-4 shrink-0'}
        />
        <Skeleton className={size === 'sm' ? 'h-4 w-24' : 'h-5 w-28'} />
      </div>
    </div>
  )
}
