'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import { FetchMassesProps } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import { cn } from 'cn'
import { buttonVariants } from '../ui/button'
import { IconPhoto } from '@tabler/icons-react'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import { format } from 'date-fns'

const columnHelper = createColumnHelper<DataTableFeatures, FetchMassesProps>()

export const SundayMassColumns = columnHelper.columns([
  columnHelper.accessor('parish', {
    header: 'Parroquia',
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)

      const formattedTime = format(createdAt, 'PP pp', {
        locale: es,
        in: tz('America/Lima'),
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
  }),
  columnHelper.display({
    id: 'evidenceUrl',
    header: 'Evidencia',
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <a
            href={`https://jox4e78o3v.ufs.sh/f/${row.original.evidenceFileKey}`}
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
  }),
  columnHelper.accessor('status', {
    header: () => (
      <div className='w-full text-right'>
        <span>Estado</span>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className='flex items-center justify-end'>
          <SundayMassStatusLabel
            status={status}
            verifier={row.original.verifier}
          />
        </div>
      )
    },
  }),
])
