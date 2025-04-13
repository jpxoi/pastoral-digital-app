'use client'

import {
  IconBarrierBlock,
  IconClock,
  IconRefresh,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

const MAINTENANCE_CONFIG = {
  startDateTime: new Date('2025-04-13T14:30:00Z'),
  estimatedCompletionTime: new Date('2025-04-13T20:00:00Z'),
  reason: 'Actualización del sistema',
}

export default function MaintenancePage() {
  const currentTime = new Date()
  const { startDateTime, estimatedCompletionTime } = MAINTENANCE_CONFIG

  const formattedTime = estimatedCompletionTime.toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const formattedDate = estimatedCompletionTime.toLocaleDateString('es', {
    day: 'numeric',
    month: 'long',
  })

  const startTime = startDateTime.getTime()
  const endTime = estimatedCompletionTime.getTime()
  const percentageComplete = Math.min(
    100,
    Math.round(
      ((currentTime.getTime() - startTime) / (endTime - startTime)) * 100
    )
  )

  return (
    <main className='fixed inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary p-4 md:gap-6 md:p-8'>
      <div className='flex max-w-md flex-col items-center'>
        <div className='mb-6'>
          <IconBarrierBlock className='size-24 text-white' />
        </div>

        <h1 className='mb-4 text-4xl font-bold text-white drop-shadow-lg'>
          En Mantenimiento
        </h1>

        <div className='w-full rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/15'>
          <p className='text-center text-lg text-white'>
            La aplicación está en mantenimiento. Por favor, vuelve más tarde.
          </p>

          <div className='mt-6 space-y-4'>
            {/* Progress bar */}
            <div className='w-full'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-xs font-medium text-white'>
                  Progreso estimado
                </span>
                <span className='text-xs font-medium text-white'>
                  {percentageComplete}%
                </span>
              </div>
              <div
                className='h-2 w-full overflow-hidden rounded-full bg-white/10'
                role='progressbar'
                aria-valuenow={percentageComplete}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className='h-2 rounded-full bg-green-400 transition-all duration-1000'
                  style={{ width: `${percentageComplete}%` }}
                />
              </div>
            </div>

            {/* Estimated completion time */}
            <div className='flex items-center justify-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
              <IconClock className='text-white/90' size={20} />
              <div>
                <p className='text-center text-sm text-white/90'>
                  Tiempo estimado de finalización:
                </p>
                <p className='text-center font-semibold text-white'>
                  {formattedDate} a las {formattedTime}
                </p>
              </div>
            </div>

            {/* Refresh button */}
            <button
              onClick={() => window.location.reload()}
              className={cn(
                'mt-4 flex w-full items-center justify-center gap-2 rounded-lg',
                'bg-white/10 p-3 text-sm text-white transition-all duration-300',
                'hover:bg-white/20 active:bg-white/30'
              )}
            >
              <IconRefresh size={16} />
              <span>Comprobar estado</span>
            </button>
          </div>
        </div>

        <div className='mt-8 text-sm text-white/70'>
          Gracias por su paciencia
        </div>
      </div>
    </main>
  )
}
