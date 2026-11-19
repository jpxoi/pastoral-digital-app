import { Table } from '@tanstack/react-table'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const rowCount = table.getRowCount()
  const pageCount = Math.max(table.getPageCount(), 1)
  const firstRow = rowCount === 0 ? 0 : pageIndex * pageSize + 1
  const lastRow = Math.min((pageIndex + 1) * pageSize, rowCount)
  const visibleRange = `${firstRow.toLocaleString('es-PE')}-${lastRow.toLocaleString('es-PE')} de ${rowCount.toLocaleString('es-PE')}`

  return (
    <div className='flex items-center justify-between gap-3 px-2'>
      <div className='flex min-w-0 flex-1 items-center gap-x-3'>
        <span className='text-sm font-medium tabular-nums'>{visibleRange}</span>
        <Separator
          orientation='vertical'
          className='my-auto hidden h-5 sm:block'
        />
        <div className='hidden items-center gap-x-2 text-sm sm:flex'>
          <span>Mostrar</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex shrink-0 items-center gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <Button
            variant='ghost'
            size='icon-sm'
            className='hidden lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Ir a la primera página</span>
            <IconChevronsLeft className='size-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Ir a la página anterior</span>
            <IconChevronLeft className='size-4' />
          </Button>
        </div>
        <span className='font-mono text-sm tabular-nums' aria-live='polite'>
          <span className='font-bold'>{pageIndex + 1}</span>/{pageCount}
        </span>
        <div className='flex items-center gap-x-1'>
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Ir a la página siguiente</span>
            <IconChevronRight className='size-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon-sm'
            className='hidden lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Ir a la última página</span>
            <IconChevronsRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
