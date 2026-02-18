'use client'

import { FetchMassesProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { IconPhoto } from '@tabler/icons-react'

export const SundayMassColumns: ColumnDef<FetchMassesProps>[] = [
  {
    accessorKey: 'parish',
    header: 'Parroquia',
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      const formattedTime = createdAt.toLocaleString('es-PE', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Lima',
      })

      return (
        <div className='flex flex-col gap-1 text-left'>
          <span className='max-w-80 truncate font-medium'>
            {row.original.parish}
          </span>
          <span className='text-xs text-nowrap text-gray-500'>
            {formattedTime}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'evidenceUrl',
    header: 'Evidencia',
    cell: ({ row }) => {
      return (
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
      )
    },
  },
  {
    accessorKey: 'verified',
    header: () => (
      <div className='w-full text-right'>
        <span>Estado</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.verified
      return (
        <div className='flex items-center justify-end'>
          <SundayMassStatusLabel
            verified={status ? 'verificado' : 'pendiente'}
          />
        </div>
      )
    },
  },
]
