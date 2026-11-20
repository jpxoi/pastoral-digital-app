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
  if (!(await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS)))
    return null

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
      <EventAddRecordButton eventId={eventId} catechists={catechists} />
      <EventFillAbsenteesButton eventId={eventId} />
    </div>
  )
}
