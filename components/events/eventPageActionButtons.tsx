import { getAllUsers } from '@/queries/select'
import EventFillAbsenteesButton from './eventFillAbsenteesButton'
import EventAddRecordButton from './eventAddRecordButton'

export default async function EventPageActionButtons({
  eventId,
}: {
  eventId: string
}) {
  const users = await getAllUsers()
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
