'use client'

import { Button } from '../ui/button'
import { FetchMassesProps } from '@/types'
import { IconFileTypeCsv } from '@tabler/icons-react'
import { toast } from 'sonner'

export default function ExportToCsvMasses() {
  const handleClick = async () => {
    toast.promise(fetch('/api/masses'), {
      loading: 'Exportando CSV...',
      success: async (res) => {
        const data = await res.json()

        if (!res.ok) {
          throw new Error('Error al exportar el archivo CSV.')
        }

        if (data.success) {
          const sundayMass = data.data as FetchMassesProps[]

          const csvString = [
            [
              'id',
              'user_id',
              'full_name',
              'category',
              'student_code',
              'parish',
              'evidence_url',
              'verified',
              'verfied_by_user_id',
              'verified_by_full_name',
              'verified_at',
              'created_at',
            ],
            ...sundayMass.map((item) => [
              item.id,
              item.user.id,
              `${item.user.firstName} ${item.user.lastName}`,
              item.user.category,
              item.user.studentCode,
              item.parish,
              item.evidenceUrl,
              item.verified ? 'Verificado' : 'Pendiente',
              item.verifiedBy,
              item.verifier
                ? `${item.verifier.firstName} ${item.verifier.lastName}`
                : '',
              item.verifiedAt
                ? new Intl.DateTimeFormat('es-PE', {
                    timeZone: 'America/Lima',
                    dateStyle: 'medium',
                    timeStyle: 'long',
                  }).format(new Date(item.verifiedAt))
                : '',
              new Intl.DateTimeFormat('es-PE', {
                timeZone: 'America/Lima',
                dateStyle: 'medium',
                timeStyle: 'long',
              }).format(new Date(item.createdAt as Date)),
            ]),
          ]
            .map((e) => e.join(';'))
            .join('\n')

          const blob = new Blob([csvString], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `registro-misas.csv`
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
      <IconFileTypeCsv className='h-4 w-4' />
      <span>Exportar CSV</span>    </Button>
  )
}
