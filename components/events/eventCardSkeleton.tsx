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
        <CardTitle className='text-lg'>
          <Skeleton className='h-7 w-3/4' />
        </CardTitle>
        <CardDescription className='space-y-0.5'>
          <span className='flex items-center gap-1 text-ellipsis'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-24' />
          </span>
          <span className='flex items-center gap-1 text-ellipsis'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-16' />
          </span>
          <span className='flex items-center gap-1 text-ellipsis text-primary hover:underline'>
            <Skeleton className='size-4' />
            <Skeleton className='h-5 w-1/2' />
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        <Skeleton className='h-5 w-1/4' />
        <Skeleton className='my-0.5 h-5 w-1/4' />
      </CardContent>
    </Card>
  )
}
