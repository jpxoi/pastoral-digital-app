import { auth } from '@clerk/nextjs/server'
import { connection } from 'next/server'
import { and, eq } from 'drizzle-orm'
import {
  IconCircleCheck,
  IconCircleMinus,
  IconClock,
} from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { db } from '@/db/drizzle'
import { sundayMassesTable } from '@/db/schema'
import {
  getMassRegistrationWindow,
  MASS_REGISTRATION_CLOSED_MESSAGE,
} from '@/lib/mass-registration'
import { SundayMassStatus } from '@/types'
import MassRegistrationDialog from './massRegistrationDialog'

const noticeAppearance = {
  [SundayMassStatus.PENDING]: {
    icon: IconClock,
    className: 'border-border bg-muted/50 text-muted-foreground',
  },
  [SundayMassStatus.ACCEPTED]: {
    icon: IconCircleCheck,
    className:
      'border-emerald-200 bg-emerald-50/60 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300',
  },
  [SundayMassStatus.REJECTED]: {
    icon: IconCircleMinus,
    className:
      'border-amber-200 bg-amber-50/60 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-300',
  },
  closed: {
    icon: IconClock,
    className: 'border-border bg-muted/50 text-muted-foreground',
  },
}

function RegistrationNotice({
  title,
  description,
  status = 'closed',
}: {
  title: string
  description: string
  status?: SundayMassStatus | 'closed'
}) {
  const { icon: Icon, className } = noticeAppearance[status]
  return (
    <Alert role='status' className={className}>
      <Icon aria-hidden='true' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

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

  if (register === '1' && sunday && sunday !== window.sundayDate)
    return (
      <RegistrationNotice
        title='Plazo de registro finalizado'
        description='El plazo del recordatorio que abriste ya terminó. Revisa tus registros en Mis misas.'
      />
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
    <MassRegistrationDialog
      initiallyOpen={register === '1'}
      closesAt={window.closesAt.getTime()}
    />
  )
}
