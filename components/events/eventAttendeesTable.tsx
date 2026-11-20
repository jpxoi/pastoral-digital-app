import { getAttendanceRecordsByEventId } from '@/queries/select'
import { DataTable } from '../ui/data-table'
import { getEventAttendeesColumns } from './eventAttendeesColumns'
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
    <DataTable
      columns={getEventAttendeesColumns(canDelete)}
      data={attendanceRecords}
      globalFilterColumnId='catequista'
    />
  )
}
