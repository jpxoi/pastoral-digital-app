import { Card, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IconCake } from '@tabler/icons-react'
import {
  getDaysUntilBirthday,
  getTurnsAge,
  getBirthdayRelativeDate,
  getThisYearBirthday,
} from '@/lib/birthday'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type BirthdayCardProps = {
  firstName: string
  lastName: string
  dateOfBirth: string
}

export default function BirthdayCard({
  firstName,
  lastName,
  dateOfBirth,
}: BirthdayCardProps) {
  const daysUntil = getDaysUntilBirthday(dateOfBirth)
  const isToday = daysUntil === 0

  const birthday = getThisYearBirthday(dateOfBirth)
  const relativeDate = getBirthdayRelativeDate(dateOfBirth)

  const fullDate = birthday.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const shortDate = birthday.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
    ...(birthday.getFullYear() !== new Date().getFullYear()
      ? { year: 'numeric' as const }
      : {}),
  })
  const dateLabel =
    daysUntil <= 7
      ? relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)
      : shortDate

  return (
    <Card
      size='sm'
      className={cn(
        'h-full text-left',
        isToday && 'bg-blue-50/60 ring-blue-200'
      )}
    >
      <CardHeader className='gap-2'>
        <div className='flex flex-wrap items-start justify-between gap-2'>
          <h3 className='min-w-0 flex-1 basis-40 text-base leading-snug font-semibold'>
            {firstName} {lastName}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type='button'
                  aria-label={fullDate}
                  className={cn(
                    'bg-muted focus-visible:ring-ring inline-flex shrink-0 cursor-default items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium focus-visible:ring-2 focus-visible:outline-none',
                    isToday && 'bg-blue-100 text-blue-700'
                  )}
                >
                  <IconCake className='size-3.5' aria-hidden='true' />
                  <time dateTime={formatDateOnly(birthday)}>{dateLabel}</time>
                </button>
              </TooltipTrigger>
              <TooltipContent>{fullDate}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className='text-muted-foreground text-xs leading-normal'>
          Cumple{' '}
          <span className='font-medium'>{getTurnsAge(dateOfBirth)} años</span>
        </p>
      </CardHeader>
    </Card>
  )
}

function formatDateOnly(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
