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
    <div className='flex w-full flex-col gap-2'>
      <h1 className='text-left text-lg font-bold'>Mis Asistencias</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>
                <div className='w-full text-right'>
                  <span>Estado</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 2 }).map((_, index) => (
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
    </div>
  )
}
