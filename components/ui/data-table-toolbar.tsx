'use client'

import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter'
import {
  AttendanceStatusFilterOptions,
  UserCategoryFilterOptions,
  UserRoleFilterOptions,
  UserAssignmentFilterOptions,
} from '@/lib/filter'
import { IconSearch, IconX } from '@tabler/icons-react'
import type { ReactNode } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  children?: ReactNode
}

export function DataTableToolbar<TData>({
  table,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const globalFilter = String(table.getState().globalFilter ?? '')

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center'>
        {children && (
          <div className='order-first flex justify-end md:order-last md:ml-auto md:shrink-0'>
            {children}
          </div>
        )}
        <InputGroup className='order-2 h-8 w-full sm:max-w-sm md:order-first'>
          <InputGroupInput
            aria-label='Buscar registros'
            placeholder='Buscar registros...'
            value={globalFilter}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className='h-full'
          />
          <InputGroupAddon>
            <IconSearch
              className='size-4 shrink-0 opacity-50'
              aria-hidden='true'
            />
          </InputGroupAddon>
          {globalFilter.length > 0 && (
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                variant='ghost'
                size='icon-xs'
                aria-label='Limpiar búsqueda'
                onClick={() => table.setGlobalFilter('')}
              >
                <IconX className='size-4 opacity-50' aria-hidden='true' />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
        <div className='order-3 flex flex-wrap items-center gap-2 md:order-2'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Rol'
              options={UserRoleFilterOptions}
            />
          )}
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
              title='Asignaciones'
              options={UserAssignmentFilterOptions}
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
    </div>
  )
}
