import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'

export default function Loading() {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Catequistas' />} />
      <UserTableSkeleton />
    </>
  )
}
