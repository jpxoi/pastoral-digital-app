import { countUsersWithNoAttendanceRecord } from '@/queries/select'
import { Button } from '../ui/button'
import EventFillAbsenteesButton from './eventFillAbsenteesButton'

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
        <>
          <Button variant='outline' size='sm' className='max-sm:w-full'>
            Exportar CSV
          </Button>
          <Button size='sm' className='max-sm:w-full'>
            Exportar PDF
          </Button>
        </>
      )}
    </div>
  )
}
