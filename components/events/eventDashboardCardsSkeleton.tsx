import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '../ui/skeleton'

export default function EventDashboardCardsSkeleton() {
  return (
    <div className='grid w-full gap-2 text-left sm:grid-cols-2 lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-5 w-28' />
            <Skeleton className='size-4' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-start py-1'>
              <Skeleton className='h-6 w-8' />
            </div>
            <Skeleton className='h-4 w-24' />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
