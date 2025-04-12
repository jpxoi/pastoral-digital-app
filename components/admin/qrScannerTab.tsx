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
import { AttendanceStatus, FetchAttendanceProps, UserSchedule } from '@/types'
import {
  ScanErrorScreen,
  ScanSuccessScreen,
} from '@/components/admin/scanStateScreen'
import ErrorAlert from '@/components/shared/errorAlert'
import { calculateStatus } from '@/lib/attendance'
import { getEventOfTheDay } from '@/actions/event'
import { fetchUserSchedule } from '@/actions/user'

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
    const fetchEvent = async () => {
      const data = await getEventOfTheDay()

      if (data?.error) {
        toast.error(data.error)
        return
      }

      if (data?.success && data?.event) {
        toast.message(`Evento: ${data.event.name}`, {
          description: `
              Hoy a las ${new Date(data.event.date).toLocaleTimeString(
                'es-PE',
                {
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZone: 'America/Lima',
                  timeZoneName: 'shortGeneric',
                }
              )}
            `,
        })
        setEvent(data.event)
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
        console.error('Camera permissions API not supported', error)
      }
    }

    fetchEvent()
    checkCameraPermission()

    const errorSound = new Audio('/sounds/error.mp3')
    const successSound = new Audio('/sounds/success.mp3')
    setErrorSound(errorSound)
    setSuccessSound(successSound)
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
        handleError('No hay ningún evento programado para hoy.')
        return
      }

      if (!user) {
        handleError(
          'No se pudo obtener tu usuario. Por favor, cierra sesión y vuelve a iniciar sesión'
        )
        return
      }

      if (userScannedId === (user.id as string)) {
        handleError(
          'No puedes registrar tu propia asistencia. Por favor, pide a otro administrador que registre tu asistencia'
        )
        return
      }

      startTransition(() => {
        toast.promise(
          async () => {
            const scannedUserSchedule = await fetchUserSchedule(userScannedId)

            if (scannedUserSchedule.error) {
              throw new Error(scannedUserSchedule.error)
            }

            const eventDate =
              scannedUserSchedule.data === UserSchedule.FULL_TIME ||
              scannedUserSchedule.data === UserSchedule.PRIMERA_COMUNION
                ? event.date
                : event.secondTurnDate

            const status = calculateStatus(checkInTime, eventDate)

            if (status === AttendanceStatus.FALTA_INJUSTIFICADA) {
              toast.info("Se procesará el registro como FALTA NO JUSTIFICADA. Este no podrá ser modificado.")
            }

            if (checkInTime > event.endDate) {
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

            return registerAttendanceRecord(newRecord)
          },
          {
            loading: 'Registrando asistencia del catequista...',
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
                'Ha ocurrido un error al registrar la asistencia. Por favor, inténtalo nuevamente'
              )
            },
          }
        )
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
                <p className='text-left text-xs text-muted-foreground'>
                  {lastScanned.checkInTime?.toLocaleDateString('es-PE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/Lima',
                    timeZoneName: 'shortGeneric',
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
