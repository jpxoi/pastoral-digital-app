import { Skeleton } from '../ui/skeleton'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table'

export default function AttendanceCalendarTableSkeleton() {
  return (
    <div className='rounded-md border'>
      <Table className='text-left'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-nowrap'>Nombre Completo</TableHead>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableHead key={index} className='text-nowrap'>
                <Skeleton className='h-5 w-12' />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 100 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium text-nowrap'>
                <Skeleton className='h-5 w-32' />
              </TableCell>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className='h-5 w-12' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
