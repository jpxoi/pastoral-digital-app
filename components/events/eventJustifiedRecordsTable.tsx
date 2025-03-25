import { getJustifiedAttendanceRecords } from '@/queries/select'
import { DataTable } from '../ui/data-table'
import { EventAttendeesColumns } from './eventAttendeesColumns'

export default async function EventJustifiedRecordsTable({
  eventId,
}: {
  eventId: number
}) {
  const justifiedRecords = await getJustifiedAttendanceRecords(eventId)

  return <DataTable columns={EventAttendeesColumns} data={justifiedRecords} />
}
