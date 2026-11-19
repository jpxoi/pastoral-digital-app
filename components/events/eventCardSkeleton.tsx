import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function EventCardSkeleton() {
  return (
    <Card size='sm' className='h-full gap-3 text-left'>
      <CardHeader className='gap-2'>
        <div className='flex items-start justify-between gap-2'>
          <Skeleton className='h-5 w-3/5' />
          <Skeleton className='h-6 w-20' />
        </div>
        <div className='flex flex-col gap-1'>
          {[32, 24, 40].map((width) => (
            <div key={width} className='flex items-center gap-2'>
              <Skeleton className='size-3.5 shrink-0' />
              <Skeleton
                className='h-4 max-w-full'
                style={{ width: `${width * 4}px` }}
              />
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className='mt-auto flex items-center justify-between gap-2'>
        <Skeleton className='size-7' />
        <Skeleton className='h-7 w-24' />
      </CardContent>
    </Card>
  )
}
