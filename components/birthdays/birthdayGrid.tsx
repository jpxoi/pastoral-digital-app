import { getUserBirthdays } from '@/queries/select'
import BirthdayList from '@/components/birthdays/birthdayList'

export default async function BirthdayGrid() {
  const now = new Date()
  const userBirthdays = await getUserBirthdays(now)

  return <BirthdayList users={userBirthdays} now={now} />
}
