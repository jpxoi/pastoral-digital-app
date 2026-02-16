'use client'

import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/ui/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter'
import {
  AttendanceStatusFilterOptions,
  UserCategoryFilterOptions,
  UserScheduleFilterOptions,
} from '@/lib/filter'
import { IconX } from '@tabler/icons-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between gap-2'>
      <div className='flex flex-1 flex-col items-start max-sm:space-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Buscar registros...'
          value={table.getState().globalFilter}
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          className='sm:max-w-xs'
        />
        <div className='flex items-center gap-2'>
          {table.getAllColumns().some((col) => col.id === 'category') && (
            <DataTableFacetedFilter
              column={table.getColumn('category')}
              title='Categoría'
              options={UserCategoryFilterOptions}
            />
          )}
          {table.getAllColumns().some((col) => col.id === 'programa') && (
            <DataTableFacetedFilter
              column={table.getColumn('programa')}
              title='Programa'
              options={UserScheduleFilterOptions}
            />
          )}
          {table.getAllColumns().some((col) => col.id === 'evento') && (
            <DataTableFacetedFilter
              column={table.getColumn('evento')}
              title='Evento'
              options={Array.from(
                (
                  table.getColumn('evento')?.getFacetedUniqueValues() as Map<
                    string,
                    number
                  >
                ).entries()
              ).map(([value]) => ({
                label: value,
                value,
              }))}
            />
          )}
          {table.getAllColumns().some((col) => col.id === 'estado') && (
            <DataTableFacetedFilter
              column={table.getColumn('estado')}
              title='Estado'
              options={AttendanceStatusFilterOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Limpiar
              <IconX />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
