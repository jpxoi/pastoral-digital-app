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

export default function AttendanceTableSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder='Buscar registros...'
            disabled
            className='max-w-xs'
          />
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>
        <Skeleton className='h-8 w-24' />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catequista</TableHead>
              <TableHead>Evento</TableHead>
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
                  <Skeleton className='h-5 w-72' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-44' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-36' />
                </TableCell>
                <TableCell className='flex items-center justify-end'>
                  <Skeleton className='my-1.5 h-5 w-32' />
                </TableCell>
                <TableCell>
                  <Skeleton className='my-1.5 h-5 w-8' />
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
