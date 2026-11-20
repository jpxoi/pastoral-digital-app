'use client'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import EventRowActions from '@/components/admin/eventRowActions'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IconInfoCircle } from '@tabler/icons-react'
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

const TurnHeader = ({ title, detail }: { title: string; detail: string }) => (
  <span className='inline-flex items-center gap-1.5 text-nowrap'>
    {title}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type='button'
            aria-label={detail}
            className='text-muted-foreground inline-flex cursor-default items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2'
          >
            <IconInfoCircle aria-hidden='true' className='size-4 shrink-0' />
          </button>
        </TooltipTrigger>
        <TooltipContent side='right' align='center'>
          {detail}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </span>
)

export const getAdminEventColumns = (
  canViewAttendance: boolean
): ColumnDef<FetchEventProps>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Evento' />
    ),
    cell: ({ row }) =>
      canViewAttendance ? (
        <Link
          className='text-primary font-medium underline-offset-4 hover:underline'
          href={`/admin/events/${row.original.id}`}
        >
          {row.original.name}
        </Link>
      ) : (
        <span className='font-medium'>{row.original.name}</span>
      ),
  },
  {
    id: 'firstTurn',
    accessorKey: 'date',
    header: () => <TurnHeader title='Primer turno' detail='Comunión' />,
    cell: ({ row }) => (
      <span className='text-nowrap'>{formatEventDate(row.original.date)}</span>
    ),
  },
  {
    id: 'secondTurn',
    accessorKey: 'secondTurnDate',
    header: () => <TurnHeader title='Segundo turno' detail='Confirmación' />,
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
      <span className='text-nowrap'>
        {formatEventDate(row.original.endDate)}
      </span>
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
    id: 'eventStatus',
    accessorFn: (event) => {
      const now = Date.now()
      if (now < new Date(event.date).getTime()) return 'Próximo'
      if (now >= new Date(event.endDate).getTime()) return 'Pasado'
      return 'En curso'
    },
    header: 'Estado',
    cell: ({ getValue }) => {
      const status = getValue<string>()
      return (
        <Badge
          variant={
            status === 'En curso'
              ? 'emerald'
              : status === 'Próximo'
                ? 'blue'
                : 'secondary'
          }
          className='whitespace-nowrap'
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <EventRowActions event={row.original} />,
  },
]
