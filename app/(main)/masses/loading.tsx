import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'

export default function Loading() {
  return (
    <div className='flex w-full flex-col gap-6'>
      <PageHeader />
      <SundayMassTableSkeleton />
    </div>
  )
}
