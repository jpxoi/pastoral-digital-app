import ErrorAlert from '@/components/shared/errorAlert'
import { IconBuildingChurch } from '@tabler/icons-react'
import { DashboardEmpty, DashboardSection } from './dashboard-section'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getSundayMassesRecordsByUserId } from '@/queries/select'
import { PersonalRecordsTable } from './personal-records-table'
import { SimpleDataTable } from '@/components/ui/simple-data-table'
import { SundayMassColumns } from './sundayMassColumns'

export default async function SundayMassTable({
  preview = true,
}: { preview?: boolean } = {}) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  let massesRecords: Awaited<ReturnType<typeof getSundayMassesRecordsByUserId>>
  try {
    massesRecords = await getSundayMassesRecordsByUserId(
      userId,
      preview ? 5 : null
    )
  } catch (error) {
    console.error('Failed to load getSundayMassesRecordsByUserId', error)
    return (
      <DashboardSection
        title='Mis misas'
        href={preview ? '/masses' : undefined}
      >
        <ErrorAlert
          title='No se pudieron cargar tus misas'
          description='Inténtalo de nuevo más tarde.'
        />
      </DashboardSection>
    )
  }

  return (
    <DashboardSection title='Mis misas' href={preview ? '/masses' : undefined}>
      {massesRecords.length > 0 ? (
        preview ? (
          <SimpleDataTable columns={SundayMassColumns} data={massesRecords} />
        ) : (
          <PersonalRecordsTable kind='masses' data={massesRecords} />
        )
      ) : (
        <DashboardEmpty icon={<IconBuildingChurch aria-hidden='true' />}>
          Aún no tienes misas registradas
        </DashboardEmpty>
      )}
    </DashboardSection>
  )
}
