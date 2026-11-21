import { EventDateTimeSkeleton } from './eventDateTime'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function EventCardSkeleton() {
  return (
    <Card size='sm' className='h-full gap-3 text-left'>
      <CardHeader className='gap-2'>
        <div className='flex flex-wrap items-start justify-between gap-2'>
          <Skeleton className='h-6 min-w-0 flex-1 basis-40' />
          <Skeleton className='h-6 w-16 shrink-0' />
        </div>
        <div className='flex flex-col gap-1'>
          <EventDateTimeSkeleton />
          <div className='flex items-center gap-2'>
            <Skeleton className='size-3.5 shrink-0' />
            <Skeleton className='h-4 w-40 max-w-full' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='mt-auto items-start'>
        <div className='flex h-7 items-center gap-1.5'>
          <Skeleton className='size-3.5 shrink-0' />
          <Skeleton className='h-4 w-28' />
        </div>
      </CardContent>
    </Card>
  )
}
