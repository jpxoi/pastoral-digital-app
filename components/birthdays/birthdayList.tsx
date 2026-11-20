import { TZDate } from '@date-fns/tz'
import type { SelectUser } from '@/db/schema'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import BirthdayCard from '@/components/birthdays/birthdayCard'
import { getDaysUntilBirthday, getThisYearBirthday } from '@/lib/birthday'
import { IconCakeOff } from '@tabler/icons-react'

type BirthdayUser = Pick<
  SelectUser,
  'id' | 'firstName' | 'lastName' | 'dateOfBirth'
>

function getBirthdayGroup(dateOfBirth: string, now: Date) {
  const daysUntil = getDaysUntilBirthday(dateOfBirth, now)
  if (daysUntil === 0) return 'today'
  if (daysUntil === 1) return 'tomorrow'
  if (daysUntil <= 7) return 'week'

  const birthday = getThisYearBirthday(dateOfBirth, now)
  const today = new TZDate(now.getTime(), 'America/Lima')
  if (
    birthday.getFullYear() === today.getFullYear() &&
    birthday.getMonth() === today.getMonth()
  ) {
    return 'month'
  }

  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  if (
    birthday.getFullYear() === nextMonth.getFullYear() &&
    birthday.getMonth() === nextMonth.getMonth()
  ) {
    return 'nextMonth'
  }

  return 'later'
}

const groups = [
  { id: 'today', title: 'Hoy' },
  { id: 'tomorrow', title: 'Mañana' },
  { id: 'week', title: 'Próximos 7 días' },
  { id: 'month', title: 'Lo que queda del mes' },
  { id: 'nextMonth', title: 'Próximo mes' },
  { id: 'later', title: 'Más adelante' },
] as const

export default function BirthdayList({
  users,
  now,
}: {
  users: BirthdayUser[]
  now: Date
}) {
  const upcomingUsers = users
    .map((user) => ({
      user,
      daysUntil: getDaysUntilBirthday(user.dateOfBirth, now),
      group: getBirthdayGroup(user.dateOfBirth, now),
    }))
    .sort((a, b) => {
      const difference = a.daysUntil - b.daysUntil
      return (
        difference ||
        `${a.user.firstName} ${a.user.lastName}`.localeCompare(
          `${b.user.firstName} ${b.user.lastName}`,
          'es-PE'
        )
      )
    })

  return (
    <div className='flex flex-col gap-5 text-left'>
      {upcomingUsers.length === 0 ? (
        <Empty className='h-full'>
          <EmptyMedia variant='icon'>
            <IconCakeOff />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No hay cumpleaños próximos</EmptyTitle>
            <EmptyDescription className='max-w-xs text-pretty'>
              No hay cumpleaños para mostrar en los próximos días. Por favor
              verifica más tarde.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        groups.map(({ id, title }) => {
          const groupUsers = upcomingUsers.filter((entry) => entry.group === id)
          if (groupUsers.length === 0) return null

          return (
            <section
              key={id}
              aria-labelledby={`birthday-group-${id}`}
              className='flex flex-col gap-2'
            >
              <div className='flex items-center'>
                <h2
                  id={`birthday-group-${id}`}
                  className='shrink-0 text-sm font-semibold'
                >
                  {title}
                </h2>
              </div>
              <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
                {groupUsers.map(({ user }) => (
                  <BirthdayCard
                    key={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    dateOfBirth={user.dateOfBirth}
                    now={now}
                  />
                ))}
              </div>
            </section>
          )
        })
      )}
    </div>
  )
}
