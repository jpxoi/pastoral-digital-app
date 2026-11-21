import { Skeleton } from '@/components/ui/skeleton'

export default function MassReviewSkeleton() {
  return (
    <div
      role='status'
      aria-label='Cargando misas pendientes'
      className='space-y-4'
    >
      <span className='sr-only'>Cargando misas pendientes</span>
      <div className='flex h-9 items-center'>
        <Skeleton className='h-5 w-44' />
      </div>
      <div
        aria-hidden='true'
        className='grid w-full min-w-0 items-start gap-4 pb-20 md:pb-0 lg:grid-cols-[minmax(0,1fr)_22.5rem]'
      >
        <Skeleton className='aspect-4/3 max-h-[65dvh] min-h-64 w-full rounded-xl border lg:max-h-[calc(100dvh-13rem)]' />
        <div className='flex min-w-0 flex-col gap-6 rounded-xl border p-5'>
          <div className='space-y-1.5'>
            <Skeleton className='h-6 w-56 max-w-full' />
            <Skeleton className='h-5 w-20' />
          </div>
          <div className='space-y-4'>
            {['Parroquia', 'Domingo', 'Fecha de registro'].map((label) => (
              <div key={label} className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-4' />
                  <Skeleton className='h-4 w-28' />
                </div>
                <Skeleton className='ml-6 h-5 w-48 max-w-full' />
              </div>
            ))}
          </div>
          <Skeleton className='h-5 w-40' />
          <div className='flex gap-2 border-t pt-4'>
            <Skeleton className='h-10 flex-1' />
            <Skeleton className='h-10 flex-1' />
          </div>
        </div>
      </div>
    </div>
  )
}
