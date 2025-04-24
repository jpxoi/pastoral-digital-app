import MaintenanceScreen from '@/components/home/maintenanceScreen'
import { IconBarrierBlock } from '@tabler/icons-react'

export default async function MaintenancePage() {
  const [startDateTime, endDateTime] = [
    '2025-04-22T10:00:00Z',
    '2025-04-25T10:00:00Z',
  ]

  return (
    <div className='flex max-w-md flex-col items-center'>
      <div className='mb-6'>
        <IconBarrierBlock className='size-24 text-white' />
      </div>

      <h1 className='mb-4 text-2xl font-bold text-white drop-shadow-lg'>
        En Mantenimiento
      </h1>

      <div className='w-full rounded-xl bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/10'>
        <p className='text-center text-white'>
          La aplicación está en mantenimiento y no está disponible
          temporalmente.
        </p>
        <p className='mt-2 text-center text-sm text-white/70'>
          Estamos trabajando para mejorar tu experiencia.
        </p>
        {startDateTime && endDateTime && (
          <MaintenanceScreen
            startDateTime={new Date(startDateTime as string)}
            endDateTime={new Date(endDateTime as string)}
          />
        )}
      </div>
      <div className='mt-8 text-sm text-white/70'>Gracias por su paciencia</div>
    </div>
  )
}
