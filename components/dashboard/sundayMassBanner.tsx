import { IconBuildingChurch } from '@tabler/icons-react'
import { getMassRegistrationWindow } from '@/lib/mass-registration'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db/drizzle'
import { sundayMassesTable } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { connection } from 'next/server'
import MassRegistrationDialog from './massRegistrationDialog'

export default async function SundayMassBanner() {
  await connection()
  const window = getMassRegistrationWindow()
  if (!window.isOpen) return null

  const { userId } = await auth()
  if (!userId) return null

  const [record] = await db
    .select({ id: sundayMassesTable.id })
    .from(sundayMassesTable)
    .where(
      and(
        eq(sundayMassesTable.userId, userId),
        eq(sundayMassesTable.sundayDate, window.sundayDate)
      )
    )
    .limit(1)
  if (record) return null

  return (
    <div className='border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
      <div className='flex min-w-0 items-start gap-3'>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full'>
          <IconBuildingChurch aria-hidden='true' className='size-5' />
        </div>
        <div className='min-w-0 space-y-1'>
          <h2 className='font-semibold'>
            ¿Ya participaste en la misa del domingo?
          </h2>
          <p className='text-muted-foreground text-sm'>
            Registra tu asistencia hasta el lunes a las 12:00 p. m.
          </p>
        </div>
      </div>
      <MassRegistrationDialog
        initiallyOpen={false}
        closesAt={window.closesAt.getTime()}
      />
    </div>
  )
}
