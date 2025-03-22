import { Skeleton } from '../ui/skeleton'

export default function LoginPromptSkeleton() {
  return (
    <div id='form-sekeleton' className='mt-6 flex flex-col items-center gap-2'>
      <Skeleton className='h-11 w-full' />
      <Skeleton className='h-11 w-full' />
    </div>
  )
}
