import { Item, ItemContent } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardCardsSkeleton() {
  return (
    <div
      className='grid w-full grid-cols-2 gap-3 lg:grid-cols-4'
      aria-label='Cargando resumen'
      role='status'
    >
      {[
        'border-emerald-200/70 bg-emerald-50',
        'border-amber-200/70 bg-amber-50',
        'border-red-200/70 bg-red-50',
        'border-primary/20 bg-primary/5',
      ].map((surface) => (
        <Item
          key={surface}
          variant='outline'
          className={`px-3 py-4 sm:px-5 ${surface}`}
        >
          <ItemContent className='min-w-0 gap-3'>
            <div className='flex h-[17.5px] items-center gap-2'>
              <Skeleton className='size-4 shrink-0' />
              <Skeleton className='h-4 w-24 max-w-full' />
            </div>
            <Skeleton className='h-[30px] w-12' />
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
