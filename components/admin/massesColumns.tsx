'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { IconCheck, IconPhoto, IconX } from '@tabler/icons-react'
import { toast } from 'sonner'
import { FetchMassesProps } from '@/types'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import UserCategoryLabel from '../shared/userCategoryLabel'
import { rejectMassRecord, verifyMassRecord } from '@/actions/mass'

const handleVerifyMass = async (id: string) => {
  toast.promise(verifyMassRecord(id), {
    loading: 'Verificando misa...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.success) {
        return data.success
      }
    },
    error: (error) => {
      return error.message || 'Ha ocurrido un error al verificar la misa.'
    },
  })
}

const handleRejectMass = async (id: string) => {
  toast.promise(rejectMassRecord(id), {
    loading: 'Rechazando misa...',
    success: (data: { error?: string; success?: string }) => {
      if (data.error) {
        throw new Error(data.error)
      }

      if (data.success) {
        return data.success
      }
    },
    error: (error) => {
      return error.message || 'Ha ocurrido un error al rechazar la misa.'
    },
  })
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
    id: 'parroquia',
    accessorKey: 'parish',
    header: () => <span className='text-nowrap'>Parroquia</span>,
    cell: ({ row }) => (
      <div className='max-w-60 truncate lg:max-w-72'>{row.original.parish}</div>
    ),
  },
  {
    id: 'evidencia',
    accessorKey: 'evidenceFileKey',
    header: () => <span className='text-nowrap'>Evidencia</span>,
    cell: ({ row }) => (
      <div className='flex gap-2'>
        <a
          href={`https://fymwpl3ap9.ufs.sh/${row.original.evidenceFileKey}`}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(buttonVariants({ variant: 'link' }), 'h-6 p-0')}
        >
          <IconPhoto className='h-4 w-4' />
          Ver
        </a>
      </div>
    ),
  },
  {
    id: 'fechaYHora',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha y Hora' />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      const formattedTime = createdAt.toLocaleString('es-PE', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Lima',
      })

      return <div className='text-nowrap'>{formattedTime}</div>
    },
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
        {row.original.verified ? (
          <Button
            variant='ghost'
            className='h-8 w-8 p-0 hover:bg-red-50'
            onClick={() => {
              handleRejectMass(row.original.id)
            }}
          >
            <span className='sr-only'>Rechazar</span>
            <IconX className='h-4 w-4 text-red-700 hover:text-red-800' />
          </Button>
        ) : (
          <Button
            variant='ghost'
            className='h-8 w-8 p-0 hover:bg-emerald-50'
            onClick={() => {
              handleVerifyMass(row.original.id)
            }}
          >
            <span className='sr-only'>Verificar</span>
            <IconCheck className='h-4 w-4 text-emerald-700 hover:text-emerald-800' />
          </Button>
        )}
      </div>
    ),
  },
]
