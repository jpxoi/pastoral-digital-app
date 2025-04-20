'use client'

import { SelectUser } from '@/db/schema'
import { Button } from '../ui/button'
import { IconFileTypeCsv } from '@tabler/icons-react'
import { toast } from 'sonner'

export default function ExportToCsvUsers() {
  const handleClick = async () => {
    toast.promise(fetch('/api/users'), {
      loading: 'Exportando CSV...',
      success: async (res) => {
        const data = await res.json()

        if (!res.ok) {
          throw new Error('Error al exportar el archivo CSV.')
        }

        if (data.success) {
          const sundayMass = data.data as SelectUser[]
          console.log('Se han obtenido las misas')

          const csvString = [
            [
              'id',
              'first_name',
              'last_name',
              'full_name',
              'nickname',
              'username',
              'email',
              'phone_number',
              'date_of_birth',
              'category',
              'student_code',
              'role',
              'schedule',
              'created_at',
              'updated_at',
            ],
            ...sundayMass.map((item) => [
              item.id,
              item.firstName,
              item.lastName,
              `${item.firstName} ${item.lastName}`,
              item.nickname,
              item.username,
              item.email,
              item.phoneNumber,
              item.dateOfBirth,
              item.category,
              item.studentCode,
              item.role,
              item.schedule,
              item.createdAt,
              item.updatedAt,
            ]),
          ]
            .map((e) => e.join(';'))
            .join('\n')

          const blob = new Blob([csvString], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `registro-usuarios.csv`
          a.click()
          URL.revokeObjectURL(url)

          return 'Se ha exportado el archivo CSV correctamente.'
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
    <Button onClick={() => handleClick()} size='sm' className='max-sm:w-full'>
      <IconFileTypeCsv className='mr-1 h-4 w-4' />
      Exportar CSV
    </Button>
  )
}
