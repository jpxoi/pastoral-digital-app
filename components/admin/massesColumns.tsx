'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import { buttonVariants } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { createColumnHelper } from '@tanstack/react-table'
import { cn } from 'cn'
import { IconPhoto } from '@tabler/icons-react'
import type { FetchMassesProps } from '@/types'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import UserCategoryLabel from '../shared/userCategoryLabel'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import { format, parseISO } from 'date-fns'

const columnHelper = createColumnHelper<DataTableFeatures, FetchMassesProps>()

export const MassesColumns = columnHelper.columns([
  columnHelper.accessor((row) => `${row.user.firstName} ${row.user.lastName}`, {
    id: 'nombreCompleto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Completo' />
    ),
    cell: ({ row }) => (
      <span className='text-nowrap'>{row.getValue('nombreCompleto')}</span>
    ),
  }),
  columnHelper.accessor('user.category', {
    id: 'category',
    header: () => <span className='text-nowrap'>Categoría</span>,
    cell: ({ row }) => (
      <UserCategoryLabel category={row.original.user.category} />
    ),
  }),
  columnHelper.accessor('parish', {
    id: 'parroquia',
    header: () => <span className='text-nowrap'>Parroquia</span>,
    cell: ({ row }) => (
      <div className='max-w-60 truncate lg:max-w-72'>{row.original.parish}</div>
    ),
  }),
  columnHelper.accessor('evidenceFileKey', {
    id: 'evidencia',
    header: () => <span className='text-nowrap'>Evidencia</span>,
    cell: ({ row }) => (
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
    ),
  }),
  columnHelper.accessor('sundayDate', {
    filterFn: (row, columnId, values: string[]) =>
      values.includes(row.getValue(columnId)),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Domingo' />
    ),
    cell: ({ row }) => (
      <time dateTime={row.original.sundayDate} className='text-nowrap'>
        {format(parseISO(row.original.sundayDate), 'PP', { locale: es })}
      </time>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'fechaYHora',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha de registro' />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt)
      const formattedTime = format(createdAt, "PP '·' p", {
        locale: es,
        in: tz('America/Lima'),
      })

      return (
        <time
          dateTime={createdAt.toISOString()}
          className='text-nowrap tabular-nums'
        >
          {formattedTime}
        </time>
      )
    },
  }),
  columnHelper.accessor('status', {
    id: 'massStatus',
    filterFn: (row, columnId, values: string[]) =>
      values.includes(row.getValue(columnId)),
    header: () => <span className='text-nowrap'>Estado</span>,
    cell: ({ row }) => (
      <SundayMassStatusLabel
        status={row.original.status}
        verifier={row.original.verifier}
      />
    ),
  }),
])
