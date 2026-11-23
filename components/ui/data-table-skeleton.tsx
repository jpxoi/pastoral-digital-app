import { cn } from 'cn'
import type { ReactNode } from 'react'
import PageActions from '@/components/shared/pageActions'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type SkeletonColumn = {
  label: string
  width: string
  secondary?: boolean
  badge?: boolean | 'default'
  align?: 'right'
}

export function TableActionsSkeleton({
  kind,
  primary = true,
  menu = true,
}: {
  kind: 'events' | 'records' | 'calendar' | 'users' | 'masses' | 'communities'
  primary?: boolean
  menu?: boolean
}) {
  const refresh = <Skeleton className='h-9 w-full sm:size-8' />
  if (kind === 'records') return <Skeleton className='h-9 w-full sm:size-8' />
  if (kind === 'events')
    return (
      <PageActions className={primary ? undefined : 'grid-cols-1'}>
        {refresh}
        {primary && <Skeleton className='h-9 w-full sm:h-8 sm:w-36' />}
      </PageActions>
    )
  if (kind === 'users')
    return (
      <PageActions className='grid-cols-[auto_minmax(0,1fr)]'>
        <Skeleton className='h-9 w-28 sm:size-8' />
        {(primary || menu) && (
          <ButtonGroup className='w-full min-w-0 sm:w-auto'>
            {primary && (
              <Skeleton className='h-9 min-w-0 flex-1 sm:h-8 sm:w-44 sm:flex-none' />
            )}
            {primary && menu && <ButtonGroupSeparator />}
            {menu && <Skeleton className='size-9 sm:size-8' />}
          </ButtonGroup>
        )}
      </PageActions>
    )
  return (
    <PageActions>
      {refresh}
      {kind === 'masses' && <Skeleton className='h-9 w-full sm:h-8 sm:w-32' />}
      {primary && (
        <Skeleton
          className={cn(
            'h-9 w-full sm:h-8 sm:w-36',
            kind === 'masses' && 'order-first col-span-2 sm:order-last'
          )}
        />
      )}
    </PageActions>
  )
}

export function TableToolbarSkeleton({
  filters = 0,
  actions = false,
}: {
  filters?: number
  actions?: ReactNode
}) {
  return (
    <div
      aria-hidden='true'
      className='flex flex-col gap-2 md:flex-row md:items-center'
    >
      {actions && (
        <div className='order-first flex w-full justify-end sm:w-auto md:order-last md:ml-auto md:shrink-0'>
          {typeof actions === 'boolean' ? (
            <TableActionsSkeleton kind='communities' />
          ) : (
            actions
          )}
        </div>
      )}
      <Skeleton className='order-2 h-9 w-full sm:h-8 sm:max-w-sm md:order-first' />
      {filters > 0 && (
        <div className='order-3 flex flex-wrap items-center gap-2 md:order-2'>
          {Array.from({ length: filters }, (_, index) => (
            <Skeleton key={index} className='h-9 w-24 sm:h-8' />
          ))}
        </div>
      )}
    </div>
  )
}

export function TablePaginationSkeleton() {
  return (
    <div
      aria-hidden='true'
      className='flex items-center justify-between gap-3 px-2'
    >
      <div className='flex min-w-0 flex-1 items-center gap-3'>
        <Skeleton className='h-5 w-24' />
        <div className='hidden items-center gap-2 sm:flex'>
          <div className='bg-border h-5 w-px' />
          <Skeleton className='h-5 w-14' />
          <Skeleton className='my-1.5 h-5 w-17.5' />
        </div>
      </div>
      <div className='flex shrink-0 items-center gap-2'>
        <div className='flex items-center gap-1'>
          <Skeleton className='m-2 hidden size-4 shrink-0 lg:block' />
          <Skeleton className='m-2 size-4 shrink-0' />
        </div>
        <Skeleton className='h-5 w-8' />
        <div className='flex items-center gap-1'>
          <Skeleton className='m-2 size-4 shrink-0' />
          <Skeleton className='m-2 hidden size-4 shrink-0 lg:block' />
        </div>
      </div>
    </div>
  )
}

export function DataTableSkeleton({
  columns,
  rows = 10,
  filters = 0,
  actions = false,
  preview = false,
  label = 'Cargando registros',
}: {
  columns: SkeletonColumn[]
  rows?: number
  filters?: number
  actions?: ReactNode
  preview?: boolean
  label?: string
}) {
  return (
    <div role='status' aria-label={label} className='min-w-0 space-y-4'>
      <span className='sr-only'>{label}</span>
      {!preview && <TableToolbarSkeleton filters={filters} actions={actions} />}
      <div aria-hidden='true' className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={cn(column.align === 'right' && 'text-right')}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }, (_, row) => (
              <TableRow key={row} className='hover:bg-transparent'>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    <div
                      className={cn(
                        'flex min-h-8 flex-col justify-center gap-1',
                        column.align === 'right' && 'items-end'
                      )}
                    >
                      <Skeleton
                        className={cn(
                          column.width,
                          column.badge === 'default'
                            ? 'h-5 rounded-4xl'
                            : column.badge
                              ? 'h-8 rounded-lg'
                              : 'h-5',
                          !column.badge && row % 3 === 1 && 'opacity-70'
                        )}
                      />
                      {column.secondary && <Skeleton className='h-4 w-32' />}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {!preview && <TablePaginationSkeleton />}
    </div>
  )
}
