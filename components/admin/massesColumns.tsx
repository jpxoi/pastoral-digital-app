'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { IconCheck, IconFileDownload, IconX } from '@tabler/icons-react'
import { toast } from 'sonner'
import { FetchMassesProps } from '@/types'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import UserCategoryLabel from '../shared/userCategoryLabel'

const handleVerifyMass = async (id: string) => {
  // Implement the logic to verify the mass
  toast.promise(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('Misa verificada correctamente')
      }, 1000)
    }),
    {
      loading: 'Verificando misa...',
      success: 'Misa verificada correctamente',
      error: 'Error al verificar la misa',
    }
  )
}

const handleRejectMass = async (id: string) => {
  // Implement the logic to reject the mass
  toast.error('Misa rechazada correctamente')
}

export const MassesColumns: ColumnDef<FetchMassesProps>[] = [
  {
    id: 'nombreCompleto',
    accessorFn: (row) => `${row.user.firstName} ${row.user.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Completo' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.getValue('nombreCompleto')}</span>
    ),
  },
  {
    id: 'category',
    accessorKey: 'user.category',
    header: () => <span className='text-nowrap'>Categoría</span>,
    cell: ({ row }) => (
      <UserCategoryLabel category={row.original.user.category} />
    ),
  },
  {
    id: 'evidencia',
    accessorKey: 'evidenceUrl',
    header: () => <span className='text-nowrap'>Evidencia</span>,
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <a
          href={row.original.evidenceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(buttonVariants({ variant: 'link' }), 'h-6 p-0')}
        >
          <IconFileDownload className='h-4 w-4' />
          Descargar
        </a>
      </div>
    ),
  },
  {
    id: 'fecha',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha y Hora' />
    ),
    cell: ({ row }) => (
      <div>
        {row.original.createdAt?.toLocaleDateString('es-PE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Lima',
          timeZoneName: 'shortGeneric',
        })}
      </div>
    ),
  },
  {
    id: 'verificado',
    accessorKey: 'verified',
    header: () => <span className='text-nowrap'>Estado</span>,
    cell: ({ row }) => (
      <SundayMassStatusLabel
        verified={row.original.verified ? 'verificado' : 'pendiente'}
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className='flex gap-4' key={row.id}>
        <Button
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-emerald-50'
          disabled={row.original.verified}
          onClick={() => {
            handleVerifyMass(row.original.id)
          }}
        >
          <span className='sr-only'>Verificar</span>
          <IconCheck className='h-4 w-4 text-emerald-700 hover:text-emerald-800' />
        </Button>
        <Button
          variant='ghost'
          className='h-8 w-8 p-0 hover:bg-red-50'
          disabled={!row.original.verified}
          onClick={() => {
            handleRejectMass(row.original.id)
          }}
        >
          <span className='sr-only'>Rechazar</span>
          <IconX className='h-4 w-4 text-red-700 hover:text-red-800' />
        </Button>
      </div>
    ),
  },
]
