import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'

export default function EventCardSkeleton() {
  return (
    <Card className='text-left'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <Skeleton className='h-7 w-3/4' />
          <Skeleton className='size-6' />
        </CardTitle>
        <CardDescription className='space-y-0.5'>
          <span className='flex items-center gap-1 text-ellipsis'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-24' />
          </span>
          <span className='flex items-center gap-1 text-ellipsis'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-36' />
          </span>
          <span className='flex items-center gap-1 text-ellipsis text-primary hover:underline'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-1/2' />
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-6 w-28' />
      </CardContent>
    </Card>
  )
}
