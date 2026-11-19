import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function BirthdayCardSkeleton() {
  return (
    <Card size='sm' className='h-full text-left'>
      <CardHeader className='gap-2'>
        <div className='flex items-start justify-between gap-2'>
          <Skeleton className='h-5 w-3/5' />
          <Skeleton className='h-6 w-24 shrink-0' />
        </div>
        <Skeleton className='h-4 w-24' />
      </CardHeader>
    </Card>
  )
}
