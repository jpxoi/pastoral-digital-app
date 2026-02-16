'use client'

import { IconClock, IconRefresh } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function MaintenanceScreen({
  startDateTime,
  endDateTime,
}: {
  startDateTime: Date
  endDateTime: Date
}) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const calculateTimeRemaining = () => {
    const difference = endDateTime.getTime() - currentTime.getTime()

    if (difference <= 0) {
      return { hours: 0, minutes: 0 }
    }

    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    return { hours, minutes }
  }

  const timeRemaining = calculateTimeRemaining()

  const formattedTime = endDateTime.toLocaleTimeString('es', {
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
      (endDateTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
    ),
    'days'
  )

  const startTime = startDateTime.getTime()
  const endTime = endDateTime.getTime()
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
      <div className='flex items-center justify-center gap-2 rounded-lg bg-white/5 p-4 backdrop-blur-xs'>
        <IconClock className='text-white/90' size={20} />
        <p className='text-center text-sm font-semibold text-white'>
          Finaliza {formattedDate} a las {formattedTime}
        </p>
      </div>

      {timeRemaining.hours > 0 || timeRemaining.minutes > 0 ? (
        <div className='mt-4 flex items-center justify-center gap-3 rounded-lg bg-white/5 p-4 backdrop-blur-xs'>
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
