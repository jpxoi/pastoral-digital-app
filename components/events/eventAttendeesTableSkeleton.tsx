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

export default function EventAttendeesTableSkeleton() {
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
              <TableHead>Catequista</TableHead>
              <TableHead>Hora de Ingreso</TableHead>
              <TableHead>
                <div className='text-right'>Estado</div>
              </TableHead>
              <TableHead>
                <div></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-5 w-40' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-20' />
                </TableCell>
                <TableCell>
                  <div className='flex justify-end'>
                    <Skeleton className='h-8 w-32' />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-8' />
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
