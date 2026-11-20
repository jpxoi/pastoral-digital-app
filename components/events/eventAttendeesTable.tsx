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
  const [canUpdate, canDelete] = await Promise.all([
    checkPermission(Permission.ATTENDANCE_UPDATE_RECORD_STATUS),
    checkPermission(Permission.ATTENDANCE_DELETE_RECORDS),
  ])

  return (
    <EventAttendeesTableClient
      canDelete={canDelete}
      canUpdate={canUpdate}
      attendanceRecords={attendanceRecords}
    />
  )
}
