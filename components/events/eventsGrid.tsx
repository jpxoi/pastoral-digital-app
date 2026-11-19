import { Suspense } from 'react'
import UpcomingEvents from './upcomingEvents'
import EventCardGroupSkeleton from './eventCardGroupSkeleton'

export default function EventsGrid() {
  return (
    <Suspense fallback={<EventCardGroupSkeleton />}>
      <UpcomingEvents />
    </Suspense>
  )
}
