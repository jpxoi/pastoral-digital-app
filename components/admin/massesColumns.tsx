'use client'

import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { IconCheck, IconLoader2, IconPhoto, IconX } from '@tabler/icons-react'
import { toast } from 'sonner'
import { FetchMassesProps, SundayMassStatus } from '@/types'
import SundayMassStatusLabel from '../shared/sundayMassStatusLabel'
import UserCategoryLabel from '../shared/userCategoryLabel'
import { rejectMassRecord, verifyMassRecord } from '@/actions/mass'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import { format, parseISO } from 'date-fns'

function MassReviewActions({ id }: { id: string }) {
  const [pendingAction, setPendingAction] = useState<
    'reject' | 'verify' | null
  >(null)

  const handleReview = async (action: 'reject' | 'verify') => {
    setPendingAction(action)

    const isVerify = action === 'verify'
    const promise = isVerify ? verifyMassRecord(id) : rejectMassRecord(id)

    toast.promise(promise, {
      loading: isVerify ? 'Verificando misa...' : 'Rechazando misa...',
      success: (data: { error?: string; success?: string }) => {
        if (data.error) {
          throw new Error(data.error)
        }

        return data.success
      },
      error: (error) =>
        error.message ||
        `Ha ocurrido un error al ${isVerify ? 'verificar' : 'rechazar'} la misa.`,
    })

    try {
      await promise
    } catch {
      // toast.promise reports the error to the user.
    } finally {
      setPendingAction(null)
    }
  }

  const isPending = pendingAction !== null

  return (
    <div className='flex gap-4'>
      <Button
        variant='outline'
        className='h-8 w-8 p-0 hover:bg-red-50'
        disabled={isPending}
        aria-label={pendingAction === 'reject' ? 'Rechazando misa' : 'Rechazar'}
        aria-busy={pendingAction === 'reject'}
        onClick={() => handleReview('reject')}
      >
        {pendingAction === 'reject' ? (
          <IconLoader2 className='h-4 w-4 animate-spin' />
        ) : (
          <IconX className='h-4 w-4 text-red-700 hover:text-red-800' />
        )}
      </Button>
      <Button
        variant='outline'
        className='h-8 w-8 p-0 hover:bg-emerald-50'
        disabled={isPending}
        aria-label={pendingAction === 'verify' ? 'Verificando misa' : 'Aceptar'}
        aria-busy={pendingAction === 'verify'}
        onClick={() => handleReview('verify')}
      >
        {pendingAction === 'verify' ? (
          <IconLoader2 className='h-4 w-4 animate-spin' />
        ) : (
          <IconCheck className='h-4 w-4 text-emerald-700 hover:text-emerald-800' />
        )}
      </Button>
    </div>
  )
}

export const getMassesColumns = (
  canReview: boolean
): ColumnDef<FetchMassesProps>[] => [
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
  },
  {
    accessorKey: 'sundayDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Domingo' />
    ),
    cell: ({ row }) => (
      <time dateTime={row.original.sundayDate} className='text-nowrap'>
        {format(parseISO(row.original.sundayDate), 'PP', { locale: es })}
      </time>
    ),
  },
  {
    id: 'fechaYHora',
    accessorKey: 'createdAt',
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
  },
  {
    id: 'massStatus',
    accessorKey: 'status',
    header: () => <span className='text-nowrap'>Estado</span>,
    cell: ({ row }) => <SundayMassStatusLabel status={row.original.status} />,
  },
  ...(canReview
    ? [
        {
          id: 'actions',
          cell: ({ row }) =>
            row.original.status === SundayMassStatus.PENDING ? (
              <MassReviewActions id={row.original.id} />
            ) : null,
        } satisfies ColumnDef<FetchMassesProps>,
      ]
    : []),
]
