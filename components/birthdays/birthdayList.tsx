'use client'

import { useMemo } from 'react'
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

function getBirthdayGroup(dateOfBirth: string) {
  const daysUntil = getDaysUntilBirthday(dateOfBirth)
  if (daysUntil === 0) return 'today'
  if (daysUntil === 1) return 'tomorrow'
  if (daysUntil <= 7) return 'week'

  const birthday = getThisYearBirthday(dateOfBirth)
  const today = new Date()
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

export default function BirthdayList({ users }: { users: BirthdayUser[] }) {
  const upcomingUsers = useMemo(
    () =>
      users
        .map((user) => ({
          user,
          daysUntil: getDaysUntilBirthday(user.dateOfBirth),
          group: getBirthdayGroup(user.dateOfBirth),
        }))
        .sort((a, b) => {
          const dayDifference = a.daysUntil - b.daysUntil
          if (dayDifference !== 0) return dayDifference
          const nameA = `${a.user.firstName} ${a.user.lastName}`
          const nameB = `${b.user.firstName} ${b.user.lastName}`
          return nameA.localeCompare(nameB, 'es-PE')
        }),
    [users]
  )

  return (
    <div className='flex flex-col gap-5 text-left'>
      {upcomingUsers.length === 0 ? (
        <Empty className='bg-muted/30 h-full rounded-lg'>
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
              <div className='flex items-center gap-3'>
                <h2
                  id={`birthday-group-${id}`}
                  className='shrink-0 text-sm font-semibold'
                >
                  {title}
                </h2>
                <span className='bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-xs tabular-nums'>
                  {groupUsers.length}
                </span>
              </div>
              <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
                {groupUsers.map(({ user }) => (
                  <BirthdayCard
                    key={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    dateOfBirth={user.dateOfBirth}
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
