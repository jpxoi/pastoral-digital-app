import AdminEventsTableSkeleton from '@/components/admin/adminEventsTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'

export default function Loading() {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Eventos' />} />
      <AdminEventsTableSkeleton />
    </>
  )
}
