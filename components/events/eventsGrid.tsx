import { Suspense } from 'react'
import UpcomingEvents from './upcomingEvents'
import EventCardGroupSkeleton from './eventCardGroupSkeleton'
import { DashboardSection } from '@/components/dashboard/dashboard-section'

export default function EventsGrid() {
  return (
    <Suspense
      fallback={
        <DashboardSection title='Eventos'>
          <EventCardGroupSkeleton />
        </DashboardSection>
      }
    >
      <UpcomingEvents />
    </Suspense>
  )
}
