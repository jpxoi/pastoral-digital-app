import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IconCake } from '@tabler/icons-react'
import {
  isBirthdayToday,
  getTurnsAge,
  getBirthdayRelativeDate,
  getThisYearBirthday,
} from '@/lib/birthday'

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
  const isToday = isBirthdayToday(dateOfBirth)

  return (
    <Card
      className={cn(
        'max-w-full text-left',
        isToday && 'border-blue-700 bg-blue-50'
      )}
    >
      <CardHeader>
        <CardTitle className='flex max-w-full justify-between gap-2 text-base font-semibold sm:text-lg'>
          <span className='truncate'>
            {firstName} {lastName}
          </span>
          <IconCake className={cn('size-6', isToday && 'text-blue-700')} />
        </CardTitle>
        <CardDescription
          className={cn(
            'flex justify-between gap-2 text-xs sm:text-sm',
            isToday && 'text-blue-700'
          )}
        >
          <span className='truncate'>
            Cumple {getTurnsAge(dateOfBirth)} años{' '}
            {getBirthdayRelativeDate(dateOfBirth)}
          </span>
          <span className='text-nowrap'>
            {getThisYearBirthday(dateOfBirth).toLocaleDateString('es-PE', {
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
