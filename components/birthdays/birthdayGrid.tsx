import { getUserBirthdays } from '@/queries/select'
import BirthdayList from '@/components/birthdays/birthdayList'

export default async function BirthdayGrid() {
  const userBirthdays = await getUserBirthdays()

  return <BirthdayList users={userBirthdays} />
}
