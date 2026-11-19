import { Metadata } from 'next'
import { Suspense } from 'react'
import AdminEventsTable from '@/components/admin/adminEventsTable'
import EventCreateDialogButton from '@/components/admin/eventCreateDialogButton'
import { getAllLocations } from '@/queries/select'

export const metadata: Metadata = {
  title: 'Administrar Eventos | Pastoral Digital App',
}

export default async function Page() {
  const locations = await getAllLocations()

  return (
    <>
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Administrar Eventos
          </h1>
          <p className='text-sm text-neutral-500'>
            Consulta los eventos y crea nuevos horarios de asistencia.
          </p>
        </div>
        <div className='flex flex-col items-start gap-2 sm:items-end'>
          <EventCreateDialogButton locations={locations} />
          {locations.length === 0 && (
            <p className='text-sm text-neutral-500'>
              Registra una ubicación en la base de datos para crear eventos.
            </p>
          )}
        </div>
      </div>
      <Suspense
        fallback={
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Cargando eventos…
          </p>
        }
      >
        <AdminEventsTable />
      </Suspense>
    </>
  )
}
