import { getUserBirthdays } from '@/queries/select'
import BirthdayList from '@/components/birthdays/birthdayList'
import { DashboardSection } from '@/components/dashboard/dashboard-section'

export default async function BirthdayGrid() {
  const now = new Date()
  const userBirthdays = await getUserBirthdays(now)

  return (
    <DashboardSection title='Cumpleaños'>
      <BirthdayList users={userBirthdays} now={now} />
    </DashboardSection>
  )
}
