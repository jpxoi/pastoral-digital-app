import { getAttendanceRecordsByEventId } from '@/queries/select'
import EventAttendeesTableClient from './eventAttendeesTableClient'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export default async function EventAttendeesTable({
  eventId,
}: {
  eventId: string
}) {
  const attendanceRecords = await getAttendanceRecordsByEventId(eventId)
  const canDelete = await checkPermission(Permission.ATTENDANCE_MANAGE_RECORDS)

  return (
    <EventAttendeesTableClient
      canDelete={canDelete}
      attendanceRecords={attendanceRecords}
    />
  )
}
