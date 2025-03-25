import { Suspense } from 'react'
import PastEvents from './pastEvents'
import UpcomingEvents from './upcomingEvents'
import EventCardGroupSkeleton from './eventCardGroupSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export default function EventsGrid() {
  return (
    <Tabs defaultValue='upcoming' className='w-full'>
      <TabsList className='mb-2 grid w-full grid-cols-2'>
        <TabsTrigger value='upcoming'>Próximos eventos</TabsTrigger>
        <TabsTrigger value='past'>Eventos pasados</TabsTrigger>
      </TabsList>
      <TabsContent value='upcoming'>
        <Suspense fallback={<EventCardGroupSkeleton />}>
          <UpcomingEvents />
        </Suspense>
      </TabsContent>
      <TabsContent value='past'>
        <Suspense fallback={<EventCardGroupSkeleton />}>
          <PastEvents />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
