'use client'

import type { DataTableFeatures } from '@/components/ui/data-table-features'

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import EventRowActions from '@/components/admin/eventRowActions'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { IconInfoCircle } from '@tabler/icons-react'
import { FetchEventProps } from '@/types'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import Link from 'next/link'

const columnHelper = createColumnHelper<DataTableFeatures, FetchEventProps>()

const eventDateOptions = { locale: es, in: tz('America/Lima') }

function EventDateTime({ date }: { date: Date }) {
  const value = new Date(date)

  return (
    <time
      dateTime={value.toISOString()}
      className='inline-flex items-center gap-1.5 whitespace-nowrap tabular-nums'
    >
      <span>{format(value, 'PP', eventDateOptions)}</span>
      <span aria-hidden='true' className='text-muted-foreground'>
        ·
      </span>
      <span>{format(value, 'p', eventDateOptions)}</span>
    </time>
  )
}

const TurnHeader = ({ title, detail }: { title: string; detail: string }) => (
  <span className='inline-flex items-center gap-1.5 text-nowrap'>
    {title}
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
  </span>
)

export const getAdminEventColumns = (
  canViewAttendance: boolean,
  canEditEvents: boolean
) =>
  columnHelper.columns([
    columnHelper.accessor('name', {
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
    }),
    columnHelper.accessor('date', {
      id: 'firstTurn',
      header: () => <TurnHeader title='Primer turno' detail='Comunión' />,
      cell: ({ row }) => <EventDateTime date={row.original.date} />,
    }),
    columnHelper.accessor('secondTurnDate', {
      id: 'secondTurn',
      header: () => <TurnHeader title='Segundo turno' detail='Confirmación' />,
      cell: ({ row }) => <EventDateTime date={row.original.secondTurnDate} />,
    }),
    columnHelper.accessor('endDate', {
      id: 'endDate',
      header: () => <span className='text-nowrap'>Fin del evento</span>,
      cell: ({ row }) => <EventDateTime date={row.original.endDate} />,
    }),
    columnHelper.accessor(
      (row) => `${row.location.name} ${row.location.address}`,
      {
        id: 'location',
        header: () => 'Ubicación',
        cell: ({ row }) => (
          <div
            className='max-w-56 truncate'
            title={row.original.location.address}
          >
            {row.original.location.name}
          </div>
        ),
      }
    ),
    columnHelper.accessor(
      (event) => {
        const now = Date.now()
        if (now < new Date(event.date).getTime()) return 'Próximo'
        if (now >= new Date(event.endDate).getTime()) return 'Pasado'
        return 'En curso'
      },
      {
        id: 'eventStatus',
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
      }
    ),
    ...(canEditEvents
      ? [
          columnHelper.display({
            id: 'actions',
            cell: ({ row }) => <EventRowActions event={row.original} />,
          }),
        ]
      : []),
  ])
