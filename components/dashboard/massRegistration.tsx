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
import SundayMassBanner from './sundayMassBanner'
import RegistrationNotice from './massRegistrationNotice'

export default async function MassRegistration({
  searchParams,
}: {
  searchParams?: Promise<{
    register?: string | string[]
    sunday?: string | string[]
  }>
}) {
  await connection()
  const { userId } = await auth()
  if (!userId) return null

  const { register, sunday } = (await searchParams) ?? {}
  const window = getMassRegistrationWindow()

  if (register === '1' && sunday && sunday !== window.sundayDate)
    return (
      <RegistrationNotice
        title='Plazo de registro finalizado'
        description='El plazo del recordatorio que abriste ya terminó. Revisa tus registros en Mis misas.'
      />
    )

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
    return (
      <RegistrationNotice
        status={record.status}
        title={
          record.status === SundayMassStatus.REJECTED
            ? 'Registro rechazado'
            : record.status === SundayMassStatus.ACCEPTED
              ? 'Registro aprobado'
              : 'Registro pendiente de revisión'
        }
        description={
          record.status === SundayMassStatus.REJECTED
            ? 'Tu registro de misa de este domingo fue rechazado.'
            : record.status === SundayMassStatus.ACCEPTED
              ? 'Tu registro de misa de este domingo ya fue aprobado.'
              : 'Ya enviaste tu registro de misa de este domingo y está pendiente de revisión.'
        }
      />
    )
  }
  if (!window.isOpen)
    return (
      <RegistrationNotice
        title='Plazo de registro finalizado'
        description={MASS_REGISTRATION_CLOSED_MESSAGE}
      />
    )

  return (
    <SundayMassBanner
      initiallyOpen={register === '1'}
      closesAt={window.closesAt.getTime()}
    />
  )
}
