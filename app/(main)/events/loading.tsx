import EventCardGroupSkeleton from '@/components/events/eventCardGroupSkeleton'
import PageHeader from '@/components/shared/pageHeader'
import { DashboardSection } from '@/components/dashboard/dashboard-section'

export default function Loading() {
  return (
    <div className='flex w-full flex-col gap-6'>
      <PageHeader />
      <DashboardSection title='Eventos'>
        <EventCardGroupSkeleton />
      </DashboardSection>
    </div>
  )
}
