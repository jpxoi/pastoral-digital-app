'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

import { SelectEvent } from '@/db/schema'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

import { useState, useEffect, useTransition } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { registerAttendanceRecord } from '@/actions/attendance'
import { UserSchedule } from '@/types'
import {
  ScanErrorScreen,
  ScanSuccessScreen,
  ScanWarningScreen,
} from '@/components/admin/scanStateScreen'
import ErrorAlert from '@/components/shared/errorAlert'
import { calculateStatus } from '@/lib/attendance'
import { fetchUserSchedule } from '@/actions/user'

import useSound from 'use-sound'
import {
  IconCalendar,
  IconCalendarOff,
  IconUser,
  IconUserOff,
} from '@tabler/icons-react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { useLastScannedStore } from '@/stores/last-scanned-store'
import { format } from 'date-fns'
import { tz } from '@date-fns/tz'
import { es } from 'date-fns/locale'
import { Badge } from '../ui/badge'
import useSWR from 'swr'
import { Spinner } from '../ui/spinner'
import { Skeleton } from '../ui/skeleton'

const fetcher = async (url: string) => {
  const data = await fetch(url)
  const json = await data.json()

  if (!data.ok) {
    throw new Error(json.error)
  }

  return json
}

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [warning, setWarning] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'prompt'
  >('prompt')

  const lastScanned = useLastScannedStore((state) => state.lastScanned)
  const addLastScanned = useLastScannedStore((state) => state.addLastScanned)

  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()
  const { data: event, isLoading: eventIsLoading } = useSWR<SelectEvent>(
    '/api/events/today',
    fetcher
  )

  const [playSuccessSound] = useSound('/sounds/success.mp3')
  const [playWarningSound] = useSound('/sounds/warning.mp3')
  const [playErrorSound] = useSound('/sounds/error.mp3')

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
        console.error('Error checking camera permission:', error)
        toast.error(
          'No se pudo verificar el estado de los permisos de la cámara.'
        )
      }
    }

    checkCameraPermission()
  }, [])

  const handleError = (error?: string) => {
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

        if (data.lastAttendanceRecord !== undefined) {
          addLastScanned(data.lastAttendanceRecord)
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
      <div className='space-y-4'>
        {cameraPermission === 'denied' && (
          <ErrorAlert
            title='Acceso a la cámara denegado'
            description='Por favor, habilite el acceso en la configuración de su navegador para continuar.'
          />
        )}
        <Item variant='outline'>
          <ItemMedia variant='icon'>
            {eventIsLoading ? (
              <Spinner />
            ) : event ? (
              <IconCalendar />
            ) : (
              <IconCalendarOff className='text-destructive' />
            )}
          </ItemMedia>
          <ItemContent>
            {eventIsLoading ? (
              <>
                <Skeleton className='h-4.75 w-1/2 max-w-60' />
                <Skeleton className='h-5.25 w-1/4 max-w-40' />
              </>
            ) : (
              <>
                <ItemTitle className='line-clamp-1 text-left'>
                  {event ? event.name : 'No se encontró ningún evento'}
                </ItemTitle>
                <ItemDescription className='line-clamp-1 text-left'>
                  {event
                    ? format(new Date(event.date), 'PP pp', {
                        locale: es,
                        in: tz('America/Lima'),
                      })
                    : 'No hay ningún evento programado para hoy.'}
                </ItemDescription>
              </>
            )}
          </ItemContent>
          {event && (
            <ItemActions>
              <Badge variant='default'>Evento del día</Badge>
            </ItemActions>
          )}
        </Item>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card className='w-full'>
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
          <div className='flex w-full flex-col gap-4'>
            {lastScanned.length > 0 ? (
              lastScanned.map((record) => (
                <Item key={record.id} variant='muted'>
                  <ItemMedia variant='icon'>
                    <IconUser />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className='line-clamp-1 text-left'>
                      {record.user.firstName} {record.user.lastName}
                    </ItemTitle>
                    <ItemDescription className='line-clamp-1 text-left'>
                      {format(new Date(record.checkInTime), 'PP pp', {
                        locale: es,
                        in: tz('America/Lima'),
                      })}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <AttendanceStatusLabel status={record.status} />
                  </ItemActions>
                </Item>
              ))
            ) : (
              <Empty className='bg-muted/30'>
                <EmptyHeader>
                  <EmptyMedia variant='icon'>
                    <IconUserOff />
                  </EmptyMedia>
                  <EmptyTitle>
                    No hay registros de asistencia recientes
                  </EmptyTitle>
                  <EmptyDescription>
                    Por favor, escanee el código QR de un usuario para registrar
                    su asistencia.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
