import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import { getUsersWithNoAttendanceRecord } from '@/queries/select'
import EventFillAbsenteesButton from './eventFillAbsenteesButton'
import EventAddRecordButton from './eventAddRecordButton'

export default async function EventPageActionButtons({
  eventId,
}: {
  eventId: string
}) {
  const [canCreateRecords, canFillAbsences] = await Promise.all([
    checkPermission(Permission.ATTENDANCE_CREATE_RECORDS),
    checkPermission(Permission.ATTENDANCE_FILL_ABSENCES),
  ])
  if (!canCreateRecords && !canFillAbsences) return null

  const users = await getUsersWithNoAttendanceRecord(eventId)
  if (!users.length) return null
  const catechists = users.map(({ id, firstName, lastName, studentCode }) => ({
    id,
    firstName,
    lastName,
    studentCode,
  }))

  return (
    <div className='flex w-full items-center justify-end gap-2'>
      {canCreateRecords && (
        <EventAddRecordButton eventId={eventId} catechists={catechists} />
      )}
      {canFillAbsences && <EventFillAbsenteesButton eventId={eventId} />}
    </div>
  )
}
