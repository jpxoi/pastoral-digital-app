import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <Empty>
      <Spinner className='size-10' />
    </Empty>
  )
}
