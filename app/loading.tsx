import Spinner from '@/components/shared/spinner'

export default function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <Spinner />
    </div>
  )
}
