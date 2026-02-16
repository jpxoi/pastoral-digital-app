'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

import { SelectEvent } from '@/db/schema'

import { useState, useEffect, useTransition } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { registerAttendanceRecord } from '@/actions/attendance'
import { FetchAttendanceProps, UserSchedule } from '@/types'
import {
  ScanErrorScreen,
  ScanSuccessScreen,
  ScanWarningScreen,
} from '@/components/admin/scanStateScreen'
import ErrorAlert from '@/components/shared/errorAlert'
import { calculateStatus } from '@/lib/attendance'
import { fetchUserSchedule } from '@/actions/user'

import useSound from 'use-sound'

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [warning, setWarning] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'prompt'
  >('prompt')
  const [lastScanned, setLastScanned] = useState<FetchAttendanceProps | null>(
    null
  )
  const [event, setEvent] = useState<SelectEvent | undefined>(undefined)
  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()

  const [playSuccessSound] = useSound('/sounds/success.mp3')
  const [playWarningSound] = useSound('/sounds/warning.mp3')
  const [playErrorSound] = useSound('/sounds/error.mp3')

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await fetch('/api/events/today', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await data.json()

      if (!data.ok) {
        toast.error(json.error)
        return
      }

      if (json.success && json.event) {
        toast.message(`Evento: ${json.event.name}`, {
          description: `
              Hoy a las ${new Date(json.event.date).toLocaleTimeString(
                'es-PE',
                {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'America/Lima',
                }
              )}
            `,
        })
        setEvent(json.event)
        return
      }
    }

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
        console.error('Error checking camera permission:', error)
        toast.error(
          'No se pudo verificar el estado de los permisos de la cámara.'
        )
      }
    }

    fetchEvent()
    checkCameraPermission()
  }, [])

  const handleError = (error?: string) => {
    setLastScanned(null)
    setError(true)
    setTimeout(() => setError(false), 1000)

    playErrorSound()
    if (error) showError(error)
  }

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 1000)

    playSuccessSound()
  }

  const handleWarning = () => {
    setWarning(true)
    setTimeout(() => setWarning(false), 1000)

    playWarningSound()
  }

  const showError = (error: string) => {
    toast.error(error)
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (!detectedCodes) return

    const userScannedId = detectedCodes[0].rawValue
    const checkInTime = new Date()

    if (!event) {
      handleError('No hay ningún evento programado para hoy.')
      return
    }

    if (!user) {
      handleError(
        'No se pudo obtener tu usuario. Por favor, cierra sesión y vuelve a iniciar sesión'
      )
      return
    }

    toast.loading('Registrando asistencia...')

    startTransition(async () => {
      try {
        const scannedUserSchedule = await fetchUserSchedule(userScannedId)

        if (scannedUserSchedule.error) {
          throw new Error(scannedUserSchedule.error)
        }

        const eventDate =
          scannedUserSchedule.data === UserSchedule.FULL_TIME ||
          scannedUserSchedule.data === UserSchedule.PRIMERA_COMUNION ||
          scannedUserSchedule.data === UserSchedule.LOGISTICA ||
          scannedUserSchedule.data === UserSchedule.SEMILLEROS
            ? event.date
            : event.secondTurnDate

        const status = calculateStatus(checkInTime, new Date(eventDate))

        if (checkInTime > new Date(event.endDate)) {
          throw new Error(
            'No puedes registrar asistencia después de la hora de finalización del evento.'
          )
        }

        const newRecord = {
          userId: userScannedId,
          eventId: event.id as number,
          checkInTime: checkInTime,
          status: status,
          registeredBy: user.id as string,
        }

        const data = await registerAttendanceRecord(newRecord)

        if (data.error) {
          throw new Error(data.error)
        }

        toast.dismiss()

        if (data.lastAttendanceRecord) {
          setLastScanned(data.lastAttendanceRecord)
        }

        if (data.warning) {
          handleWarning()
          toast.warning(data.warning)
          return
        }

        if (data.success) {
          toast.success(data.success)
          handleSuccess()
          return
        }
      } catch (error) {
        toast.dismiss()
        handleError()
        toast.error(
          error instanceof Error
            ? error.message
            : 'Ha ocurrido un error al registrar la asistencia.'
        )
      }
    })
  }

  return (
    <>
      {error && <ScanErrorScreen />}
      {success && <ScanSuccessScreen />}
      {warning && <ScanWarningScreen />}
      <TabsContent value='scan' className='space-y-4'>
        {cameraPermission === 'denied' && (
          <ErrorAlert
            title='Acceso a la cámara denegado'
            description='Por favor, habilite el acceso en la configuración de su navegador para continuar.'
          />
        )}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
          <Card>
            <CardHeader>
              <div className='mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-xl border border-gray-200'>
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
            </CardHeader>
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
              <CardHeader className='flex h-full flex-col items-center justify-center'>
                <h2 className='text-left text-lg font-semibold'>
                  {lastScanned.user.firstName} {lastScanned.user.lastName}
                </h2>
                <p className='text-muted-foreground text-left text-xs'>
                  {lastScanned.checkInTime?.toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/Lima',
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
