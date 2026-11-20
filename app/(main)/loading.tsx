import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Cargando…' />} />
      <Empty>
        <Spinner className='size-10' />
      </Empty>
    </>
  )
}
