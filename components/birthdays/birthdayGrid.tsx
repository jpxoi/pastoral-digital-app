import { getUserBirthdays } from '@/queries/select'
import { connection } from 'next/server'
import BirthdayList from '@/components/birthdays/birthdayList'
import { DashboardSection } from '@/components/dashboard/dashboard-section'

export default async function BirthdayGrid() {
  await connection()
  const now = new Date()
  const userBirthdays = await getUserBirthdays(now)

  return (
    <DashboardSection title='Cumpleaños'>
      <BirthdayList users={userBirthdays} now={now} />
    </DashboardSection>
  )
}
