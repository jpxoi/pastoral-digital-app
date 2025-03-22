import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IconCake } from '@tabler/icons-react'
import { Skeleton } from '../ui/skeleton'

export default function BirthdayCardSkeleton() {
  return (
    <Card className={cn('text-left')}>
      <CardHeader>
        <CardTitle className='flex justify-between gap-2 text-lg font-semibold'>
          <span className='truncate'>
            <Skeleton className='h-6 w-48 sm:h-7' />
          </span>
          <IconCake className='size-6' />
        </CardTitle>
        <CardDescription
          className={cn('flex justify-between gap-2 text-xs sm:text-sm')}
        >
          <span className='truncate'>
            <Skeleton className='h-4 w-36 sm:h-5' />
          </span>
          <span className='text-nowrap'>
            <Skeleton className='h-4 w-20 sm:h-5' />
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
