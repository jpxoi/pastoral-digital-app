import PageHeader from '@/components/shared/pageHeader'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <PageHeader />
      <div
        role='status'
        aria-label='Cargando página'
        className='flex w-full flex-col gap-4'
      >
        <span className='sr-only'>Cargando página</span>
        <Skeleton className='h-7 w-48 max-w-full' />
        <div aria-hidden='true' className='divide-y rounded-xl border'>
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-4 p-4'
            >
              <div className='flex min-w-0 flex-1 flex-col gap-2'>
                <Skeleton className='h-5 w-48 max-w-full' />
                <Skeleton className='h-4 w-32 max-w-full' />
              </div>
              <Skeleton className='h-8 w-20 shrink-0 rounded-lg' />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
