'use client'

import { IconClock, IconRefresh } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const MAINTENANCE_CONFIG = {
  startDateTime: new Date('2025-04-13T14:30:00Z'),
  estimatedCompletionTime: new Date('2025-04-13T20:00:00Z'),
}

export default function MaintenancePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { startDateTime, estimatedCompletionTime } = MAINTENANCE_CONFIG

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const calculateTimeRemaining = () => {
    const difference = estimatedCompletionTime.getTime() - currentTime.getTime()

    if (difference <= 0) {
      return { hours: 0, minutes: 0 }
    }

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    return { hours, minutes }
  }

  const timeRemaining = calculateTimeRemaining()

  const formattedTime = estimatedCompletionTime.toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Lima',
  })
  const formattedDate = new Intl.RelativeTimeFormat('es-PE', {
    numeric: 'auto',
    style: 'short',
  }).format(
    Math.floor(
      (estimatedCompletionTime.getTime() - currentTime.getTime()) /
        (1000 * 60 * 60 * 24)
    ),
    'days'
  )

  const startTime = startDateTime.getTime()
  const endTime = estimatedCompletionTime.getTime()
  const percentageComplete = Math.min(
    100,
    Math.round(
      ((currentTime.getTime() - startTime) / (endTime - startTime)) * 100
    )
  )

  return (
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
          className='h-2 w-full overflow-hidden rounded-full bg-white/5'
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
      <div className='flex items-center justify-center gap-2 rounded-lg bg-white/5 p-4 backdrop-blur-sm'>
        <IconClock className='text-white/90' size={20} />
        <p className='text-center text-sm font-semibold text-white'>
          Finaliza {formattedDate} a las {formattedTime}
        </p>
      </div>

      {timeRemaining.hours > 0 || timeRemaining.minutes > 0 ? (
        <div className='mt-4 flex items-center justify-center gap-3 rounded-lg bg-white/5 p-4 backdrop-blur-sm'>
          <div>
            <p className='text-center text-sm text-white/90'>
              Tiempo restante:
            </p>
            <p className='text-center font-semibold text-white'>
              {timeRemaining.hours > 0 && `${timeRemaining.hours} horas `}
              {timeRemaining.minutes} minutos
            </p>
          </div>
        </div>
      ) : (
        <div className='mt-4 rounded-lg bg-yellow-500/20 p-4'>
          <p className='text-center text-sm font-medium text-white'>
            El mantenimiento está tardando más de lo esperado. Gracias por su
            paciencia.
          </p>
        </div>
      )}

      {/* Refresh button */}
      <Button
        variant='outline'
        onClick={() => window.location.reload()}
        className='w-full'
      >
        <IconRefresh size={16} />
        <span>Comprobar estado</span>
      </Button>
    </div>
  )
}
