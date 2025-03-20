'use client'

import { useState, useEffect } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

// Mock data for demo purposes
const mockAttendanceToday = [
  {
    id: 1,
    userId: '123',
    name: 'Juan Pérez',
    timestamp: '09:15 AM',
    status: 'present',
  },
  {
    id: 2,
    userId: '456',
    name: 'María González',
    timestamp: '09:22 AM',
    status: 'present',
  },
  {
    id: 3,
    userId: '789',
    name: 'Carlos Rodríguez',
    timestamp: '09:45 AM',
    status: 'late',
  },
  {
    id: 4,
    userId: '101',
    name: 'Ana Martínez',
    timestamp: '10:05 AM',
    status: 'late',
  },
  {
    id: 5,
    userId: '112',
    name: 'Roberto Sánchez',
    timestamp: '--',
    status: 'absent',
  },
]

export default function AdminPage() {
  const [scanning, setScanning] = useState(false)
  const [attendanceRecords, setAttendanceRecords] =
    useState(mockAttendanceToday)
  const [lastScanned, setLastScanned] = useState(null)

  // For a real implementation, fetch attendance data
  useEffect(() => {
    // Fetch attendance data for today
    // Example: fetchTodaysAttendance().then(data => setAttendanceRecords(data))
  }, [])

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes) {
      try {
        const userScannedId = detectedCodes[0].rawValue

        const existingRecord = attendanceRecords.find(
          (record) => record.userId === userScannedId
        )

        if (existingRecord) {
          toast.error(
            `${existingRecord.name} ya registró asistencia hoy a las ${existingRecord.timestamp}`
          )
        } else {
          // Add new attendance record
          const newRecord = {
            id: attendanceRecords.length + 1,
            userId: userScannedId,
            name: detectedCodes[0].rawValue,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            status:
              new Date().getHours() >= 9 && new Date().getMinutes() > 30
                ? 'late'
                : 'present',
          }

          setAttendanceRecords([newRecord, ...attendanceRecords])
          setLastScanned(newRecord)

          toast.success(`${userScannedId} ha sido registrado exitosamente`)
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  const handleError = (error: unknown) => {
    toast.error('Error al escanear el código QR')
    console.error(error)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Panel de Administración</h1>

      <Tabs defaultValue='scan' className='w-full'>
        <TabsList className='mb-8 grid w-full grid-cols-2'>
          <TabsTrigger value='scan'>Escanear QR</TabsTrigger>
          <TabsTrigger value='attendance'>Asistencia de Hoy</TabsTrigger>
        </TabsList>

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
                      <Button onClick={() => setScanning(true)}>
                        Iniciar escáner
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  onClick={() => setScanning(!scanning)}
                >
                  {scanning ? 'Pausar' : 'Reanudar'}
                </Button>
                <Button
                  variant='outline'
                  onClick={() => {
                    setScanning(false)
                    setTimeout(() => setScanning(true), 100)
                  }}
                >
                  Reiniciar
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Último registro</CardTitle>
                <CardDescription>
                  Detalles del último código QR escaneado
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lastScanned ? (
                  <div className='flex flex-col items-center gap-4'>
                    <Avatar className='h-24 w-24'>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${lastScanned.name}`}
                        alt={lastScanned.name}
                      />
                      <AvatarFallback>
                        {lastScanned.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='text-center'>
                      <h3 className='text-xl font-semibold'>
                        {lastScanned.name}
                      </h3>
                      <p className='text-gray-500'>ID: {lastScanned.userId}</p>
                      <div className='mt-4'>
                        <AttendanceStatusLabel status={lastScanned.status} />
                        <p className='mt-2 text-gray-600'>
                          Registrado a las {lastScanned.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex h-64 items-center justify-center text-center text-gray-500'>
                    <p>
                      No hay registros recientes.
                      <br />
                      Escanea un código QR para comenzar.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='attendance'>
          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia</CardTitle>
              <CardDescription>
                Asistencias registradas para hoy -{' '}
                {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>
                  Total: {attendanceRecords.length} registros
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className='font-medium'>
                        {record.name}
                      </TableCell>
                      <TableCell>{record.timestamp}</TableCell>
                      <TableCell>
                        <AttendanceStatusLabel status={record.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button>Exportar a Excel</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
