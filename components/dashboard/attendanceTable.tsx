import { logger } from '@/lib/logger'
import ErrorAlert from '@/components/shared/errorAlert'
import { IconCalendarCheck } from '@tabler/icons-react'
import { DashboardEmpty, DashboardSection } from './dashboard-section'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getAttendanceRecordsByUserId } from '@/queries/select'
import { PersonalRecordsTable } from './personal-records-table'
import PersonalRecordsPreview from './personal-records-preview'

export default async function AttendanceTable({
  preview = true,
}: { preview?: boolean } = {}) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  let attendanceRecords: Awaited<
    ReturnType<typeof getAttendanceRecordsByUserId>
  >
  try {
    attendanceRecords = await getAttendanceRecordsByUserId(
      userId,
      preview ? 5 : null
    )
  } catch (error) {
    logger.error('Failed to load getAttendanceRecordsByUserId', { error })
    return (
      <DashboardSection title='Mis asistencias'>
        <ErrorAlert
          title='No se pudieron cargar tus asistencias'
          description='Inténtalo de nuevo más tarde.'
        />
      </DashboardSection>
    )
  }

  return (
    <DashboardSection
      title='Mis asistencias'
      href={preview ? '/attendance' : undefined}
    >
      {attendanceRecords.length > 0 ? (
        preview ? (
          <PersonalRecordsPreview kind='attendance' data={attendanceRecords} />
        ) : (
          <PersonalRecordsTable kind='attendance' data={attendanceRecords} />
        )
      ) : (
        <DashboardEmpty icon={<IconCalendarCheck aria-hidden='true' />}>
          Aún no tienes asistencias
        </DashboardEmpty>
      )}
    </DashboardSection>
  )
}
