import { Skeleton } from '@/components/ui/skeleton'
import { TableToolbarSkeleton } from '@/components/ui/data-table-skeleton'

export default function AttendanceCalendarTableSkeleton() {
  return (
    <div
      className='flex min-h-0 flex-1 flex-col gap-4'
      role='status'
      aria-label='Cargando calendario de asistencia'
    >
      <span className='sr-only'>Cargando calendario de asistencia</span>
      <TableToolbarSkeleton actions />
      <div
        aria-hidden='true'
        className='relative min-h-0 flex-1 overflow-auto rounded-md border'
      >
        <table className='w-max min-w-full border-separate border-spacing-0 text-left text-sm'>
          <thead>
            <tr>
              <th className='bg-background sticky top-0 z-20 h-10 min-w-80 border-b px-3 font-semibold whitespace-nowrap'>
                Nombre completo
              </th>
              {Array.from({ length: 10 }, (_, index) => (
                <th
                  key={index}
                  className='bg-background sticky top-0 z-20 h-10 min-w-20 border-b px-3'
                >
                  <Skeleton className='mx-auto h-4 w-12' />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }, (_, row) => (
              <tr key={row}>
                <td className='h-10 border-b px-3'>
                  <Skeleton
                    className={row % 2 === 0 ? 'h-5 w-48' : 'h-5 w-56'}
                  />
                </td>
                {Array.from({ length: 10 }, (_, column) => (
                  <td key={column} className='h-10 min-w-20 border-b px-3'>
                    <Skeleton className='mx-auto size-4' />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
