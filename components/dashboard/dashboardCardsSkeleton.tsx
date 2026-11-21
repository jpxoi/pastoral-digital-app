import { Item, ItemContent } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardCardsSkeleton() {
  return (
    <div
      className='grid w-full grid-cols-2 gap-3 lg:grid-cols-4'
      aria-label='Cargando resumen'
      role='status'
    >
      <span className='sr-only'>Cargando resumen</span>
      {[
        'border-emerald-200/70 bg-emerald-50',
        'border-amber-200/70 bg-amber-50',
        'border-red-200/70 bg-red-50',
        'border-primary/20 bg-primary/5',
      ].map((surface) => (
        <Item
          key={surface}
          variant='outline'
          aria-hidden='true'
          className={`min-w-0 px-3 py-4 sm:px-5 ${surface}`}
        >
          <ItemContent className='min-w-0 gap-3'>
            <div className='flex h-5 items-center gap-2'>
              <Skeleton className='size-4 shrink-0' />
              <Skeleton className='h-3 w-24 min-w-0 sm:h-4' />
            </div>
            <Skeleton className='h-7.5 w-12' />
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
