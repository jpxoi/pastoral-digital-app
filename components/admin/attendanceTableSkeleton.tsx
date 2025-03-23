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

export default async function AttendanceTableSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
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
              <TableHead>Nombres</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>Marca de Tiempo</TableHead>
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableCell key={index}>
                    <div className='text-left'>
                      <Skeleton className='h-5' />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination table={table} /> */}
    </div>
  )
}
