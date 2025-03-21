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

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [lastScanned, setLastScanned] = useState<any | null>(null)
  const [event, setEvent] = useState<SelectEvent | undefined>(undefined)
  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()

  useEffect(() => {
    const fetchEventId = async () => {
      const event = await getTodayEvent()
      setEvent(event || undefined)
    }
    fetchEventId()
  }, [])

  const calculateStatus = (checkInTime: Date, eventTime: Date) => {
    // Add 10 minutes tolerance
    const toleranceTime = new Date(eventTime.getTime() + 10 * 60 * 1000)

    if (checkInTime > toleranceTime) {
      return 'TARDANZA'
    } else {
      return 'A TIEMPO'
    }
  }

  const handleError = (error: unknown) => {
    showError('Ha ocurrido un error al activar el escáner')
    console.error(error)
  }

  const showError = (error: string) => {
    toast.error(error)
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes) {
      const userScannedId = detectedCodes[0].rawValue

      if (!event) {
        const audio = new Audio('/sounds/error.wav')
        audio.play()
        setLastScanned(null)
        toast.error('No hay un evento programado para hoy')
        return
      }

      if (!user) {
        const audio = new Audio('/sounds/error.wav')
        audio.play()
        setLastScanned(null)
        toast.error('No se pudo obtener el usuario actual')
        return
      }

      if (userScannedId === (user.id as string)) {
        const audio = new Audio('/sounds/error.wav')
        audio.play()
        setLastScanned(null)
        toast.error('No puedes registrarte a ti mismo')
        return
      }

      const newRecord = {
        userId: userScannedId,
        eventId: event.id as number,
        checkInTime: new Date(),
        status: calculateStatus(new Date(), event.date),
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
              return data.success
            }
          },
          error: (error) => {
            setLastScanned(null)
            const audio = new Audio('/sounds/error.wav')
            audio.play()

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
                  onError={handleError}
                  constraints={{ facingMode: 'environment' }}
                  formats={['qr_code']}
                  scanDelay={500}
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
  )
}
