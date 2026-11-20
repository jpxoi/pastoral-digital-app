import { auth } from '@clerk/nextjs/server'
import { connection } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import { sundayMassesTable } from '@/db/schema'
import {
  getMassRegistrationWindow,
  MASS_REGISTRATION_CLOSED_MESSAGE,
} from '@/lib/mass-registration'
import { SundayMassStatus } from '@/types'
import MassRegistrationDialog from './massRegistrationDialog'

export default async function MassRegistration({
  searchParams,
}: {
  searchParams: Promise<{
    register?: string | string[]
    sunday?: string | string[]
  }>
}) {
  await connection()
  const { userId } = await auth()
  if (!userId) return null

  const { register, sunday } = await searchParams
  const window = getMassRegistrationWindow()

  const notice = (message: string) => (
    <p role='status' className='text-muted-foreground text-sm'>
      {message}
    </p>
  )

  if (register === '1' && sunday && sunday !== window.sundayDate)
    return notice(
      'El plazo del recordatorio que abriste ya terminó. Revisa tus registros en Mis misas.'
    )

  if (!window.isOpen && register !== '1') return null

  const [record] = await db
    .select({ status: sundayMassesTable.status })
    .from(sundayMassesTable)
    .where(
      and(
        eq(sundayMassesTable.userId, userId),
        eq(sundayMassesTable.sundayDate, window.sundayDate)
      )
    )
    .limit(1)

  if (record) {
    if (register !== '1') return null
    return notice(
      record.status === SundayMassStatus.REJECTED
        ? 'Tu registro de misa de este domingo fue rechazado.'
        : record.status === SundayMassStatus.ACCEPTED
          ? 'Tu registro de misa de este domingo ya fue aprobado.'
          : 'Ya enviaste tu registro de misa de este domingo y está pendiente de revisión.'
    )
  }
  if (!window.isOpen)
    return notice(
      `El plazo de registro ya terminó. ${MASS_REGISTRATION_CLOSED_MESSAGE}`
    )

  return (
    <MassRegistrationDialog
      initiallyOpen={register === '1'}
      closesAt={window.closesAt.getTime()}
    />
  )
}
