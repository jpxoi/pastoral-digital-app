/* eslint-disable react-hooks/incompatible-library */
'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  Column,
  GlobalFilterTableState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '@/components/ui/data-table-pagination'
import {
  DataTableToolbar,
  type DataTableFacetedFilterConfig,
} from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  autoResetPageIndex?: boolean
  getRowId?: (row: TData) => string
  globalFilterColumnId?: string
  facetedFilters?: DataTableFacetedFilterConfig[]
  children?: ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  autoResetPageIndex = true,
  getRowId,
  globalFilterColumnId,
  facetedFilters,
  children,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterTableState>()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getRowId,
    autoResetPageIndex,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      setSorting(updater)
      table.resetPageIndex()
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater)
      table.resetPageIndex()
    },
    onGlobalFilterChange: (updater) => {
      setGlobalFilter(updater)
      table.resetPageIndex()
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterColumnId ? 'includesString' : undefined,
    getColumnCanGlobalFilter: globalFilterColumnId
      ? (column: Column<TData, unknown>) => column.id === globalFilterColumnId
      : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} facetedFilters={facetedFilters}>
        {children}
      </DataTableToolbar>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'seleccionado'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-left'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-muted-foreground h-24 text-center'
                >
                  No hay registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
