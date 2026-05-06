import { getAttendanceRecordsByEventId } from '@/queries/select'
import { DataTable } from '../ui/data-table'
import { EventAttendeesColumns } from './eventAttendeesColumns'

export default async function EventAttendeesTable({
  eventId,
}: {
  eventId: string
}) {
  const attendanceRecords = await getAttendanceRecordsByEventId(eventId)

  return <DataTable columns={EventAttendeesColumns} data={attendanceRecords} />
}
