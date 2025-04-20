import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export default function MassesTableSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex flex-1 flex-col items-start max-sm:space-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          <Input
            placeholder='Buscar registros...'
            disabled
            className='sm:max-w-xs'
          />
          <Skeleton className='h-8 w-24' />
        </div>
        <Skeleton className='h-8 w-24 max-lg:hidden' />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Parroquia</TableHead>
              <TableHead>Evidencia</TableHead>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <div></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-5 w-72' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-60' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-24' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-40' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-28' />
                </TableCell>
                <TableCell className='flex items-center justify-center gap-4'>
                  <Skeleton className='m-1.5 size-5' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}
