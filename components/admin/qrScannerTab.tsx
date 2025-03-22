'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

import { getTodayEvent } from '@/queries/select'
import { SelectEvent } from '@/schema'

import { useState, useEffect, useTransition, useMemo } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { registerAttendanceRecord } from '@/actions/attendance'
import { FetchAttendanceProps } from '@/types/interfaces'
import { ScanErrorScreen, ScanSuccessScreen } from './scanStateScreen'
import ErrorAlert from '@/components/shared/errorAlert'
import QrScannerHeader from './qrScannerHeader'
import { calculateStatus } from '@/lib/attendance'

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'prompt'
  >('prompt')
  const [lastScanned, setLastScanned] = useState<FetchAttendanceProps | null>(
    null
  )
  const [event, setEvent] = useState<SelectEvent | undefined>(undefined)
  const [errorSound, setErrorSound] = useState<HTMLAudioElement | null>(null)
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(
    null
  )
  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()

  useEffect(() => {
    const fetchEventId = async () => {
      const event = await getTodayEvent()
      setEvent(event || undefined)
    }
    fetchEventId()
    const errorSound = new Audio('/sounds/error.mp3')
    const successSound = new Audio('/sounds/success.mp3')
    setErrorSound(errorSound)
    setSuccessSound(successSound)
  }, [])

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        })
        setCameraPermission(result.state as 'granted' | 'denied' | 'prompt')

        result.onchange = () => {
          setCameraPermission(result.state as 'granted' | 'denied' | 'prompt')
        }
      } catch (error) {
        console.error('Camera permissions API not supported', error)
      }
    }

    checkCameraPermission()
  }, [])

  const handleError = (error?: string) => {
    setLastScanned(null)
    setError(true)
    setTimeout(() => setError(false), 1000)

    errorSound?.play()
    error && showError(error)
  }

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 1000)

    successSound?.play()
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
      {error && <ScanErrorScreen />}
      {success && <ScanSuccessScreen />}
      <TabsContent value='scan' className='space-y-4'>
        {cameraPermission === 'denied' && (
          <ErrorAlert
            title='Acceso a la cámara denegado'
            description='Por favor, habilite el acceso en la configuración de su navegador para continuar.'
          />
        )}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          <Card>
            <QrScannerHeader />
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
