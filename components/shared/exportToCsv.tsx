'use client'

import { FetchAttendanceProps } from '@/types'
import { Button } from '../ui/button'
import { IconFileTypeCsv } from '@tabler/icons-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'

export default function ExportToCsv({ eventId }: { eventId: number }) {
  const handleClick = async (eventId: number) => {
    toast.promise(
      fetch(`/api/attendance?eventId=${eventId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Exportando CSV...',
        success: async (res) => {
          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || 'Error al exportar el archivo CSV.')
          }

          if (data.success && data.data) {
            const attendanceRecords = data.data as FetchAttendanceProps[]
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
              ...sortedAttendanceRecords.map((item: FetchAttendanceProps) => [
                item.id,
                item.user.id,
                `${item.user.firstName} ${item.user.lastName}`,
                item.user.category,
                item.user.studentCode,
                format(new Date(item.checkInTime), 'Ppp', {
                  locale: es,
                  in: tz('America/Lima'),
                }),
                item.status,
                item.registeredBy,
                `${item.registeredByUser.firstName} ${item.registeredByUser.lastName}`,
                item.method,
              ]),
            ]
              .map((e) => e.join(';'))
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
      }
    )
  }

  return (
    <Button
      onClick={() => handleClick(eventId)}
      size='sm'
      className='max-sm:w-full'
    >
      <IconFileTypeCsv className='h-4 w-4' />
      <span>Exportar CSV</span>
    </Button>
  )
}
