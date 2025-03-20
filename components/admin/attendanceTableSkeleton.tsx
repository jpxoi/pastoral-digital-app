import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableCaption,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader } from '../ui/card'

export default async function AttendanceTableSkeleton() {
  return (
    <>
      <Table className='max-md:hidden'>
        <TableCaption>Cargando registros...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>
              <div className='h-4 w-24 animate-pulse bg-gray-200' />
            </TableCell>
            <TableCell>
              <div className='h-4 w-24 animate-pulse bg-gray-200' />
            </TableCell>
            <TableCell>
              <div className='h-4 w-24 animate-pulse bg-gray-200' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className='flex flex-col gap-4 md:hidden'>
        <p className='text-xs text-muted-foreground'>Cargando registros...</p>

        <Card>
          <CardHeader className='flex flex-col items-center justify-center'>
            <h2 className='text-left text-base font-semibold'>
              <div className='h-4 w-24 animate-pulse bg-gray-200' />
            </h2>
            <p className='text-left text-xs text-muted-foreground'>
              <div className='h-4 w-24 animate-pulse bg-gray-200' />
            </p>

            <div className='h-4 w-24 animate-pulse bg-gray-200' />
          </CardHeader>
        </Card>
      </div>
    </>
  )
}

export const dynamic = 'force-dynamic'
