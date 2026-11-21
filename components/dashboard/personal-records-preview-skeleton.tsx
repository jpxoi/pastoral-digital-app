import { Skeleton } from '@/components/ui/skeleton'

export default function PersonalRecordsPreviewSkeleton({
  label,
  evidence = false,
}: {
  label: string
  evidence?: boolean
}) {
  return (
    <div role='status' aria-label={label}>
      <span className='sr-only'>{label}</span>
      <ul
        aria-hidden='true'
        className='divide-y overflow-hidden rounded-xl border'
      >
        {Array.from({ length: 5 }, (_, index) => (
          <li
            key={index}
            className='flex flex-wrap items-center gap-x-3 gap-y-2 p-4'
          >
            <div className='min-w-0 flex-1 basis-40 space-y-1.5'>
              <Skeleton className='h-5 w-44 max-w-full' />
              <div className='flex flex-wrap items-center gap-x-3 gap-y-1.5'>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='size-3.5' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <Skeleton className='size-3.5' />
                    <Skeleton className='h-4 w-9' />
                  </div>
                </div>
                {evidence && <Skeleton className='h-4 w-24' />}
              </div>
            </div>
            <Skeleton className='ml-auto h-5 w-20 shrink-0 rounded-4xl' />
          </li>
        ))}
      </ul>
    </div>
  )
}
