'use client'

import { Button } from '../ui/button'
import { fetchAttendanceRecordsByEventId } from '@/actions/attendance'
import { toast } from 'sonner'

export default function ExportToCsv({ eventId }: { eventId: number }) {
  const handleClick = async (eventId: number) => {
    toast.promise(fetchAttendanceRecordsByEventId(eventId), {
      loading: 'Exportando CSV...',
      success: (data) => {
        if (data.error) {
          throw new Error(data.error)
        }

        if (data.success && data.records) {
          const attendanceRecords = data.records
          const csvString = [
            [
              'id',
              'user_id',
              'first_name',
              'last_name',
              'event_id',
              'check_in_time',
              'status',
              'registered_by',
              'method',
              'created_at',
              'updated_at',
            ],
            ...attendanceRecords.map((item) => [
              item.id,
              item.user.id,
              item.user.firstName,
              item.user.lastName,
              item.eventId,
              item.checkInTime,
              item.status,
              item.registeredBy,
              item.method,
              item.createdAt,
              item.updatedAt,
            ]),
          ]
            .map((e) => e.join(','))
            .join('\n')

          const blob = new Blob([csvString], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `asistencias-evento-${eventId}.csv`
          a.click()
          URL.revokeObjectURL(url)

          return data.success
        }
      },
      error: (error) => {
        return (
          error.message || 'Ha ocurrido un error al exportar el archivo CSV.'
        )
      },
    })
  }

  return (
    <Button
      onClick={() => handleClick(eventId)}
      size='sm'
      className='max-sm:w-full'
    >
      Exportar CSV
    </Button>
  )
}
