'use client'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { Button } from '@/components/ui/button'
import { FetchEventProps } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import Link from 'next/link'

const formatEventDate = (date: Date) =>
  format(new Date(date), 'PP p', {
    locale: es,
    in: tz('America/Lima'),
  })

export const AdminEventColumns: ColumnDef<FetchEventProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Evento' />
    ),
    cell: ({ row }) => (
      <span className='min-w-44 font-medium'>{row.original.name}</span>
    ),
  },
  {
    id: 'firstTurn',
    accessorKey: 'date',
    header: () => <span className='text-nowrap'>Primer turno · Comunión</span>,
    cell: ({ row }) => (
      <span className='text-nowrap'>{formatEventDate(row.original.date)}</span>
    ),
  },
  {
    id: 'secondTurn',
    accessorKey: 'secondTurnDate',
    header: () => <span className='text-nowrap'>Segundo turno · Confirmación</span>,
    cell: ({ row }) => (
      <span className='text-nowrap'>
        {formatEventDate(row.original.secondTurnDate)}
      </span>
    ),
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header: () => <span className='text-nowrap'>Fin del evento</span>,
    cell: ({ row }) => (
      <span className='text-nowrap'>{formatEventDate(row.original.endDate)}</span>
    ),
  },
  {
    id: 'location',
    accessorFn: (row) => `${row.location.name} ${row.location.address}`,
    header: () => 'Ubicación',
    cell: ({ row }) => (
      <div className='max-w-56 truncate' title={row.original.location.address}>
        {row.original.location.name}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button asChild variant='outline' size='sm'>
        <Link href={`/admin/events/${row.original.id}`}>Ver asistencia</Link>
      </Button>
    ),
  },
]
