import { auth } from '@clerk/nextjs/server'
import { TZDate } from '@date-fns/tz'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { sundayMassesTable } from '@/db/schema'
import { getPeruDateKey } from '@/lib/birthday'
import MassRegistrationDialog from './massRegistrationDialog'

export default async function MassRegistration({
  searchParams,
}: {
  searchParams: Promise<{ register?: string | string[] }>
}) {
  const { userId } = await auth()
  if (!userId) return null
  const now = new TZDate(new Date(), 'America/Lima')
  if (now.getDay() !== 0 && !(now.getDay() === 1 && now.getHours() < 18))
    return null
  const sunday = new Date(now.getTime() - (now.getDay() === 1 ? 86_400_000 : 0))
  const [record] = await db
    .select({ id: sundayMassesTable.id })
    .from(sundayMassesTable)
    .where(
      and(
        eq(sundayMassesTable.userId, userId),
        eq(sundayMassesTable.sundayDate, getPeruDateKey(sunday))
      )
    )
    .limit(1)
  if (record) return null
  const { register } = await searchParams
  return <MassRegistrationDialog initiallyOpen={register === '1'} />
}
