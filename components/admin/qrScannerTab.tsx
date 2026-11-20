'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import EventSummaryCard from '@/components/events/eventSummaryCard'

import type { SelectEvent, SelectLocation } from '@/db/schema'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'

import { useState, useEffect, useTransition, useMemo, useRef } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { registerQrAttendanceRecord } from '@/actions/attendance'
import {
  ScanErrorScreen,
  ScanSuccessScreen,
} from '@/components/admin/scanStateScreen'
import ErrorAlert from '@/components/shared/errorAlert'

import useSound from 'use-sound'
import { IconCalendarOff, IconUser, IconUserOff } from '@tabler/icons-react'
import {
  Empty,
  EmptyContent,
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
import { Skeleton } from '../ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const fetcher = async (url: string) => {
  const data = await fetch(url)
  const json = await data.json()

  if (!data.ok) {
    throw new Error(json.error)
  }

  return json
}

type TodayEvent = SelectEvent & {
  location: SelectLocation | null
}

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<
    'granted' | 'denied' | 'prompt'
  >('prompt')
  const [selectedEventId, setSelectedEventId] = useState('')
  const [clock, setClock] = useState(() => new Date())
  const inFlightScans = useRef(new Set<string>())
  const successfulScans = useRef(new Set<string>())
  const duplicateFeedbackAt = useRef(new Map<string, number>())

  const lastScanned = useLastScannedStore((state) => state.lastScanned)
  const addLastScanned = useLastScannedStore((state) => state.addLastScanned)

  const [isRegistrationPending, startTransition] = useTransition()

  const { user, isLoaded } = useUser()
  const {
    data: events,
    error: eventError,
    isLoading: eventIsLoading,
    mutate: refreshEvents,
  } = useSWR<TodayEvent[]>('/api/events/today', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 60_000,
  })
  const activeEventId = events?.some(
    (todayEvent) => todayEvent.id === selectedEventId
  )
    ? selectedEventId
    : events?.length === 1
      ? events[0].id
      : ''
  const event = events?.find((todayEvent) => todayEvent.id === activeEventId)
  const scanningOpensAt = useMemo(
    () =>
      event
        ? new Date(new Date(event.date).getTime() - 3 * 60 * 60 * 1000)
        : null,
    [event]
  )
  const canScanByTime = Boolean(scanningOpensAt && clock >= scanningOpensAt)

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 30_000)
    return () => clearInterval(interval)
  }, [])

  const [playSuccessSound] = useSound('/sounds/success.mp3')
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

  const showError = (error: string) => {
    toast.error(error)
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (!detectedCodes?.length) return

    const userScannedId = detectedCodes[0].rawValue.trim()

    if (!event) {
      handleError('Selecciona un evento antes de escanear.')
      return
    }

    if (!canScanByTime) {
      handleError(
        'El escaneo estará disponible 3 horas antes del inicio del evento.'
      )
      setScanning(false)
      return
    }

    if (!user) {
      handleError(
        'No se pudo obtener tu usuario. Por favor, cierra sesión y vuelve a iniciar sesión'
      )
      return
    }

    const scanKey = `${event.id}:${userScannedId}`
    if (inFlightScans.current.has(scanKey)) {
      const now = Date.now()
      const lastFeedback = duplicateFeedbackAt.current.get(scanKey) ?? 0
      if (now - lastFeedback > 1500) {
        toast.info('Este QR ya se está procesando.')
        duplicateFeedbackAt.current.set(scanKey, now)
      }
      return
    }
    if (successfulScans.current.has(scanKey)) {
      toast.info('Este QR ya se registró correctamente para este evento.')
      return
    }

    inFlightScans.current.add(scanKey)
    toast.loading('Registrando asistencia...')

    startTransition(async () => {
      try {
        const data = await registerQrAttendanceRecord({
          userId: userScannedId,
          eventId: event.id,
        })

        if (data.error) {
          throw new Error(data.error)
        }

        toast.dismiss()

        if (data.lastAttendanceRecord !== undefined) {
          addLastScanned(data.lastAttendanceRecord)
        }

        if (data.success) {
          successfulScans.current.add(scanKey)
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
      } finally {
        inFlightScans.current.delete(scanKey)
        duplicateFeedbackAt.current.delete(scanKey)
      }
    })
  }

  return (
    <>
      {error && <ScanErrorScreen />}
      {success && <ScanSuccessScreen />}
      <div className='space-y-4'>
        {cameraPermission === 'denied' && (
          <ErrorAlert
            title='Acceso a la cámara denegado'
            description='Por favor, habilite el acceso en la configuración de su navegador para continuar.'
          />
        )}
        {events && events.length > 1 && (
          <div className='max-w-xl space-y-2'>
            <p className='text-sm font-medium'>
              Evento para registrar asistencia
            </p>
            <Select
              value={activeEventId}
              onValueChange={(value) => {
                setScanning(false)
                setSelectedEventId(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona un evento' />
              </SelectTrigger>
              <SelectContent>
                {events.map((todayEvent) => (
                  <SelectItem key={todayEvent.id} value={todayEvent.id}>
                    {todayEvent.name} ·{' '}
                    {format(new Date(todayEvent.date), 'PP pp', {
                      locale: es,
                      in: tz('America/Lima'),
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {eventIsLoading && !events ? (
          <Card size='sm' className='w-full'>
            <CardHeader className='gap-2'>
              <Skeleton className='h-5 w-1/2 max-w-80' />
              <Skeleton className='h-5 w-1/3 max-w-60' />
            </CardHeader>
          </Card>
        ) : event ? (
          <EventSummaryCard
            event={event}
            action={canScanByTime ? <Badge>Evento del día</Badge> : undefined}
          />
        ) : eventError && !events ? (
          <Empty
            className='bg-muted/20 flex-row justify-start gap-3 border-solid p-4 text-left'
            role='status'
          >
            <EmptyMedia
              variant='icon'
              className='text-muted-foreground mb-0 size-9'
            >
              <IconCalendarOff />
            </EmptyMedia>
            <EmptyHeader className='max-w-none flex-1 items-start gap-1'>
              <EmptyTitle className='text-base'>
                No se pudo cargar el evento
              </EmptyTitle>
              <EmptyDescription>
                Revisa tu conexión e inténtalo nuevamente.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className='w-auto'>
              <Button variant='outline' onClick={() => void refreshEvents()}>
                Reintentar
              </Button>
            </EmptyContent>
          </Empty>
        ) : events?.length ? (
          <Empty
            className='bg-muted/20 flex-row justify-start gap-3 border-solid p-4 text-left'
            role='status'
          >
            <EmptyMedia
              variant='icon'
              className='text-muted-foreground mb-0 size-9'
            >
              <IconCalendarOff />
            </EmptyMedia>
            <EmptyHeader className='max-w-none items-start gap-1'>
              <EmptyTitle className='text-base'>
                Selecciona un evento
              </EmptyTitle>
              <EmptyDescription>
                Elige cuál evento vas a atender.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Empty
            className='bg-muted/20 flex-row justify-start gap-3 border-solid p-4 text-left'
            role='status'
          >
            <EmptyMedia
              variant='icon'
              className='text-muted-foreground mb-0 size-9'
            >
              <IconCalendarOff />
            </EmptyMedia>
            <EmptyHeader className='max-w-none items-start gap-1'>
              <EmptyTitle className='text-base'>No hay eventos hoy</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
        {event && !canScanByTime && scanningOpensAt && (
          <p className='text-muted-foreground text-sm'>
            El escaneo estará disponible desde{' '}
            {format(scanningOpensAt, 'PP pp', {
              locale: es,
              in: tz('America/Lima'),
            })}
            .
          </p>
        )}
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
                      disabled={
                        !event ||
                        !canScanByTime ||
                        !isLoaded ||
                        isRegistrationPending
                      }
                      onClick={async () => {
                        const latestEvents = await refreshEvents()
                        const latestEvent = latestEvents?.find(
                          (todayEvent) => todayEvent.id === activeEventId
                        )
                        if (!latestEvent) {
                          toast.error(
                            'El evento ya no está disponible. Actualiza la lista.'
                          )
                          return
                        }
                        const latestScanOpensAt =
                          new Date(latestEvent.date).getTime() -
                          3 * 60 * 60 * 1000
                        if (Date.now() < latestScanOpensAt) {
                          toast.error(
                            'El escaneo estará disponible 3 horas antes del inicio del evento.'
                          )
                          return
                        }
                        setScanning(true)
                      }}
                    >
                      Iniciar escáner
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardFooter className='flex justify-between'>
              <Button
                disabled={
                  !event || !canScanByTime || !isLoaded || isRegistrationPending
                }
                variant='outline'
                onClick={() => setScanning(!scanning)}
              >
                {scanning ? 'Pausar' : 'Reanudar'}
              </Button>
              <Button
                variant='outline'
                disabled={
                  !event || !canScanByTime || !isLoaded || isRegistrationPending
                }
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
              <Empty>
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
