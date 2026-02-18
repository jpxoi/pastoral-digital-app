import { getUserBirthdays } from '@/queries/select'
import BirthdayCard from '@/components/birthdays/birthdayCard'
import { SelectUser } from '@/db/schema'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { IconCake, IconCakeOff } from '@tabler/icons-react'

export default async function BirthdayGrid() {
  const userBirthdays = await getUserBirthdays()

  return (
    <div className='grid max-w-full gap-2 md:grid-cols-2 xl:grid-cols-3'>
      {userBirthdays.map((user: SelectUser) => (
        <BirthdayCard
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          dateOfBirth={user.dateOfBirth}
        />
      ))}
      {userBirthdays.length === 0 && (
        <Empty className='bg-muted/30 col-span-full h-full rounded-lg'>
          <EmptyMedia variant='icon'>
            <IconCakeOff />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No hay cumpleaños proximos</EmptyTitle>
            <EmptyDescription className='max-w-xs text-pretty'>
              No hay cumpleaños para mostrar en los próximos días. Por favor
              verifica más tarde.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  )
}
