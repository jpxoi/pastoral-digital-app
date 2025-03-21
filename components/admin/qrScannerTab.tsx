'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

import { getTodayEvent } from '@/queries/select'
import { SelectEvent } from '@/schema'

import { useState, useEffect, useTransition } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { registerAttendanceRecord } from '@/actions/attendance'
import { FetchAttendanceProps } from '@/types/interfaces'
import { IconCheck, IconX } from '@tabler/icons-react'

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [lastScanned, setLastScanned] = useState<any | null>(null)
  const [event, setEvent] = useState<SelectEvent | undefined>(undefined)
  const [errorSound, setErrorSound] = useState<HTMLAudioElement | null>(null)
  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()

  useEffect(() => {
    const fetchEventId = async () => {
      const event = await getTodayEvent()
      setEvent(event || undefined)
    }
    fetchEventId()
    const errorSound = new Audio('/sounds/error.mp3')
    setErrorSound(errorSound)
  }, [])

  const calculateStatus = (checkInTime: Date, eventTime: Date) => {
    const timeDifference = checkInTime.getTime() - eventTime.getTime()
    const minutesDifference = Math.floor(timeDifference / (1000 * 60))

    if (minutesDifference < 0) {
      return 'A TIEMPO'
    } else if (minutesDifference < 6) {
      // From event time until 05:59 minutes after
      return 'A TIEMPO'
    } else if (minutesDifference < 16) {
      // From 06:00 until 15:59 minutes after
      return 'TARDANZA'
    } else if (minutesDifference < 20) {
      // From 16:00 until 19:59 minutes after
      return 'DOBLE TARDANZA'
    } else {
      // 20 minutes or more after event time
      return 'AUSENTE'
    }
  }

  const handleError = (error?: string) => {
    setLastScanned(null)
    setError(true)
    setTimeout(() => setError(false), 1000)

    errorSound.play()

    error && showError(error)
  }

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 1000)
  }

  const showError = (error: string) => {
    toast.error(error)
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes) {
      const userScannedId = detectedCodes[0].rawValue
      const checkInTime = new Date()

      if (!event) {
        handleError('No hay un evento programado para hoy')
        return
      }

      const status = calculateStatus(checkInTime, event.date)


      if (!user) {
        handleError('No se pudo obtener el usuario actual')
        return
      }

      if (userScannedId === (user.id as string)) {
        handleError('No puedes registrar tu propia asistencia')
        return
      }

      if (status === 'AUSENTE') {
        handleError(
          'Es demasiado tarde para registrar asistencia en este evento'
        )
        return
      }

      const newRecord = {
        userId: userScannedId,
        eventId: event.id as number,
        checkInTime: checkInTime,
        status: status,
        registeredBy: user.id as string,
      }

      startTransition(() => {
        toast.promise(registerAttendanceRecord(newRecord), {
          loading: 'Registrando asistencia...',
          success: (data: {
            error?: string
            success?: string
            lastAttendanceRecord?: FetchAttendanceProps
          }) => {
            if (data?.error) {
              throw new Error(data.error)
            }

            if (data?.success && data?.lastAttendanceRecord) {
              setLastScanned(data.lastAttendanceRecord)
              handleSuccess()
              return data.success
            }
          },
          error: (error) => {
            handleError()
            return (
              error.message ||
              'Ha ocurrido un error al registrar la asistencia.'
            )
          },
        })
      })
    }
  }
  return (
    <>
      {error && (
        <div
          id='scan-error-screen'
          className='absolute inset-0 z-50 flex items-center justify-center bg-red-600 text-white'
        >
          <IconX className='size-64 sm:size-72 md:size-80' />
        </div>
      )}
      {success && (
        <div
          id='scan-success-screen'
          className='absolute inset-0 z-50 flex items-center justify-center bg-green-600 text-white'
        >
          <IconCheck className='size-64 sm:size-72 md:size-80' />
        </div>
      )}
      <TabsContent value='scan' className='space-y-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Escanear Código QR</CardTitle>
              <CardDescription>
                Escanea el código QR del carnet pastoral para registrar la
                asistencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mx-auto aspect-square w-full max-w-md overflow-hidden rounded-xl border border-gray-200'>
                {scanning ? (
                  <Scanner
                    onScan={handleScan}
                    onError={() =>
                      showError('Ha ocurrido un error al iniciar el escáner.')
                    }
                    constraints={{ facingMode: 'environment' }}
                    formats={['qr_code']}
                    scanDelay={1000}
                  />
                ) : (
                  <div className='flex h-full items-center justify-center bg-gray-100'>
                    <Button
                      disabled={!event || !isLoaded || isRegistrationPending}
                      onClick={() => setScanning(true)}
                    >
                      Iniciar escáner
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button
                disabled={!event || !isLoaded || isRegistrationPending}
                variant='outline'
                onClick={() => setScanning(!scanning)}
              >
                {scanning ? 'Pausar' : 'Reanudar'}
              </Button>
              <Button
                variant='outline'
                disabled={!event || !isLoaded || isRegistrationPending}
                onClick={() => {
                  setScanning(false)
                  setTimeout(() => setScanning(true), 100)
                }}
              >
                Reiniciar
              </Button>
            </CardFooter>
          </Card>

          {lastScanned ? (
            <Card>
              <CardHeader className='flex flex-col items-center justify-center'>
                <h2 className='text-left text-lg font-semibold'>
                  {lastScanned.user.firstName} {lastScanned.user.lastName}
                </h2>
                <p className='text-left text-xs text-muted-foreground'>
                  {lastScanned.checkInTime?.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>

                <AttendanceStatusLabel status={lastScanned.status} />
              </CardHeader>
            </Card>
          ) : null}
        </div>
      </TabsContent>
    </>
  )
}
