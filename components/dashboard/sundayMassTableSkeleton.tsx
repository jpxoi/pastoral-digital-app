import { DashboardSection } from './dashboard-section'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export default function SundayMassTableSkeleton({
  preview = false,
}: {
  preview?: boolean
}) {
  return (
    <DashboardSection title='Mis misas' href={preview ? '/masses' : undefined}>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parroquia</TableHead>
              <TableHead>Evidencia</TableHead>
              <TableHead>
                <div className='w-full text-right'>
                  <span>Estado</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex flex-col gap-1 text-left'>
                    <Skeleton className='h-5 w-40' />
                    <Skeleton className='h-4 w-36' />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className='h-5 w-24' />
                </TableCell>
                <TableCell>
                  <div className='flex w-full justify-end'>
                    <Skeleton className='h-5 w-24' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardSection>
  )
}
