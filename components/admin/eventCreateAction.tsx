import { getAllLocations } from '@/queries/select'
import EventCreateDialogButton from '@/components/admin/eventCreateDialogButton'

export default async function EventCreateAction() {
  const locations = await getAllLocations()

  return (
    <div className='flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end'>
      <EventCreateDialogButton locations={locations} />
      {locations.length === 0 && (
        <p className='text-sm text-neutral-500'>
          Registra una ubicación en la base de datos para crear eventos.
        </p>
      )}
    </div>
  )
}
