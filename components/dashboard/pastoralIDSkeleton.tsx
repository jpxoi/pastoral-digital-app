import { Skeleton } from '@/components/ui/skeleton'

export default function PastoralIDSkeleton() {
  return (
    <div
      className='flex w-full flex-col items-center bg-white px-6 pt-7 pb-16'
      role='status'
      aria-label='Cargando Pastoral ID'
    >
      <span className='sr-only'>Cargando Pastoral ID</span>
      <div className='flex w-full flex-col items-center gap-1'>
        <Skeleton className='h-6 w-60 max-w-full' />
        <Skeleton className='h-5 w-36' />
      </div>
      <Skeleton className='mt-4 aspect-square w-full max-w-72 rounded-lg' />
      <Skeleton className='mt-2 h-9.5 w-28' />
    </div>
  )
}
