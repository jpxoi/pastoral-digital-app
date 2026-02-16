import { Skeleton } from '../ui/skeleton'

export default function PastoralIDSkeleton() {
  return (
    <div
      className='-mx-6 flex aspect-9/11 w-[calc(100%+3rem)] flex-col gap-2 bg-cover bg-center p-8 pb-2 sm:gap-4 sm:p-16 sm:pb-4'
      style={{
        backgroundImage: 'url(/graphics/id-bg.svg)',
      }}
    >
      <div className='flex grow flex-col items-center justify-start gap-2'>
        <div className='m-0 mx-auto flex aspect-square h-auto w-full flex-col items-center justify-center rounded-lg bg-white p-4 text-center sm:max-w-sm'>
          <Skeleton className='aspect-square size-full' />
        </div>
        <div className='m-0 mx-auto flex h-auto w-full items-center justify-center rounded-lg bg-white p-0 sm:max-w-sm'>
          <Skeleton className='h-5 w-72' />
        </div>
      </div>

      <div className='flex w-full flex-col items-center justify-center gap-1'>
        <Skeleton className='mt-0.5 h-7 w-64' />
        <Skeleton className='mb-0.5 h-5 w-20' />
      </div>
    </div>
  )
}
