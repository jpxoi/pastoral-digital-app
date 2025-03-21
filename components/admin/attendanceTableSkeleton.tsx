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
import { ChevronsUpDown, RefreshCcwIcon } from 'lucide-react'

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
          <RefreshCcwIcon className='h-5 w-5 animate-spin' />
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='sm'
                      disabled
                      className='-ml-3 h-8 data-[state=open]:bg-accent'
                    >
                      <span>Hora del Registro</span>
                      <ChevronsUpDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='start'>
                    {/* Add dropdown items here */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
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
                  <div className='text-nowrap text-left font-medium'>
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
