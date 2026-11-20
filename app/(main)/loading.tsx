import PageHeader from '@/components/shared/pageHeader'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <>
      <PageHeader />
      <Empty>
        <Spinner className='size-10' />
      </Empty>
    </>
  )
}
