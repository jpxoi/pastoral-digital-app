import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { Skeleton } from '../ui/skeleton'

export default function EventDashboardCardsSkeleton() {
  return (
    <div className='grid w-full grid-cols-2 gap-3 text-left lg:grid-cols-4'>
      {Array.from({ length: 4 }).map((_, index) => (
        <Item
          key={index}
          variant='outline'
          className='min-w-0 px-3 py-4 sm:px-5'
        >
          <ItemContent className='min-w-0 gap-3 text-left'>
            <ItemTitle className='w-full'>
              <Skeleton className='h-4 w-28' />
            </ItemTitle>
            <Skeleton className='h-8 w-12' />
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
