'use client'

import { Button } from '../ui/button'
import { fetchAttendanceRecordsByEventId } from '@/actions/attendance'
import { IconFileTypeCsv } from '@tabler/icons-react'
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
          const sortedAttendanceRecords = attendanceRecords.sort((a, b) => {
            return a.user.firstName.localeCompare(b.user.firstName)
          })

          const csvString = [
            [
              'id',
              'user_id',
              'full_name',
              'category',
              'student_code',
              'check_in_date',
              'check_in_time',
              'status',
              'registered_by_user_id',
              'registered_by_full_name',
              'method',
            ],
            ...sortedAttendanceRecords.map((item) => [
              item.id,
              item.user.id,
              `${item.user.firstName} ${item.user.lastName}`,
              item.user.category,
              item.user.studentCode,
              new Intl.DateTimeFormat('es-PE', {
                timeZone: 'America/Lima',
                dateStyle: 'medium',
                timeStyle: 'long',
              }).format(new Date(item.checkInTime)),
              item.status,
              item.registeredBy,
              `${item.registeredByUser.firstName} ${item.registeredByUser.lastName}`,
              item.method,
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
      <IconFileTypeCsv className='mr-1 h-4 w-4' />
      Exportar CSV
    </Button>
  )
}
