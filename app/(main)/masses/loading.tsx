import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'

export default function Loading() {
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Mis misas' />} />
      <SundayMassTableSkeleton />
    </div>
  )
}
