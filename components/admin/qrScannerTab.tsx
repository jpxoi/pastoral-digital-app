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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

import { getLastAttendanceRecord, getTodayEvent } from '@/queries/select'
import { SelectEvent } from '@/schema'

import { useState, useEffect } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { createAttendanceRecord } from '@/queries/insert'
import { NeonDbError } from '@neondatabase/serverless'

export default function QrScannerTab() {
  const [scanning, setScanning] = useState(false)
  const [lastScanned, setLastScanned] = useState<any | null>(null)
  const [event, setEvent] = useState<SelectEvent | null>(null)

  const { user, isLoaded } = useUser()

  useEffect(() => {
    const fetchEventId = async () => {
      const event = await getTodayEvent()
      setEvent(event || null)
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
    toast.error('Ha ocurrido un error al activar el escáner')
    console.error(error)
  }

  const handleDbError = (error: NeonDbError) => {
    if (error.message.includes('unq_user_event')) {
      toast.error('ERROR: El catequista ya ha sido registrado en este evento.')
    } else if (
      error.message.includes('attendance_records_user_id_users_id_fk')
    ) {
      toast.error('ERROR: El catequista no existe en la base de datos.')
    } else if (
      error.message.includes('attendance_records_event_id_events_id_fk')
    ) {
      toast.error('ERROR: El evento no existe en la base de datos.')
    } else if (
      error.message.includes('attendance_records_registered_by_users_id_fk')
    ) {
      toast.error(
        'ERROR: El usuario que registra no existe en la base de datos.'
      )
    } else {
      toast.error('Ha ocurrido un error al registrar la asistencia.')
    }

    const audio = new Audio('/sounds/error.wav')
    audio.play()
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes) {
      try {
        const userScannedId = detectedCodes[0].rawValue

        if (!event) {
          toast.error('No hay un evento programado para hoy')
          return
        }

        if (!user) {
          toast.error('No se pudo obtener el usuario actual')
          return
        }

        const newRecord = {
          userId: userScannedId,
          eventId: event.id as number,
          checkInTime: new Date(),
          status: calculateStatus(new Date(), event.date),
          registeredBy: user.id as string,
        }

        await createAttendanceRecord(newRecord)
          .then(async () => {
            toast.success('Registro de asistencia creado exitosamente')
            const lastAttendanceRecord = await getLastAttendanceRecord()
            setLastScanned(lastAttendanceRecord)
          })
          .catch((error) => {
            handleDbError(error)
            setLastScanned(null)
          })
      } catch (error) {
        toast.error('Ha ocurrido un error al registrar la asistencia')
        setLastScanned(null)
      }
    }
  }
  return (
    <TabsContent value='scan' className='space-y-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
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
                    disabled={!event && !isLoaded}
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
              disabled={!event && !isLoaded}
              variant='outline'
              onClick={() => setScanning(!scanning)}
            >
              {scanning ? 'Pausar' : 'Reanudar'}
            </Button>
            <Button
              variant='outline'
              disabled={!event && !isLoaded}
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
