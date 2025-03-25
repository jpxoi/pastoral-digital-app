import { countUsersWithNoAttendanceRecord } from '@/queries/select'
import EventFillAbsenteesButton from './eventFillAbsenteesButton'
import ExportToCsv from '../shared/exportToCsv'

export default async function EventPageActionButtons({
  eventId,
}: {
  eventId: number
}) {
  const absentUsers = await countUsersWithNoAttendanceRecord(eventId)

  return (
    <div className='flex items-center gap-2'>
      {absentUsers > 0 ? (
        <EventFillAbsenteesButton eventId={eventId} />
      ) : (
        <ExportToCsv eventId={eventId} />
      )}
    </div>
  )
}
