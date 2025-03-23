import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { IconSelector, IconRefresh } from '@tabler/icons-react'

export default async function AttendanceTableSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder='Buscar registros...'
          className='max-w-sm'
          disabled
        />
        <Button variant='ghost' disabled>
          <IconRefresh className='h-5 w-5 animate-spin' />
        </Button>
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
                <TableCell>
                  <div className='text-left'>
                    <Skeleton className='h-5' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-left'>
                    <Skeleton className='h-5' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-left'>
                    <Skeleton className='h-5' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-left'>
                    <Skeleton className='h-5' />
                  </div>
                </TableCell>
                <TableCell>
                  <div className='text-left'>
                    <Skeleton className='h-5' />
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
