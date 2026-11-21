import CommunitiesTableSkeleton from '@/components/admin/communitiesTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'

export default function Loading() {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Comunidades' />} />
      <CommunitiesTableSkeleton />
    </>
  )
}
