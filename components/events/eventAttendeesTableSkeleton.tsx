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

export default async function EventAttendeesTableSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <Input
          placeholder='Buscar registros...'
          className='max-w-sm'
          disabled
        />
        <Skeleton className='h-10 w-28' />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Catequista</TableHead>
              <TableHead>
                <div className='text-right'>Estado</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex flex-col justify-start gap-1'>
                    <Skeleton className='h-5 w-40' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex justify-end'>
                    <Skeleton className='h-8 w-32' />
                  </div>
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
