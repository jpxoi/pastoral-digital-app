import { getUserBirthdays } from '@/queries/select'
import BirthdayCard from './birthdayCard'

export default async function BirthdayGrid() {
  const userBirthdays = await getUserBirthdays()

  return (
    <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3 max-w-full'>
      {userBirthdays.map((user) => (
        <BirthdayCard
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          dateOfBirth={user.dateOfBirth}
        />
      ))}
    </div>
  )
}
