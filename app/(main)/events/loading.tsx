import EventCardGroupSkeleton from '@/components/events/eventCardGroupSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>Eventos</h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver la lista de eventos.
        </p>
      </div>
      <Tabs defaultValue='upcoming' className='w-full'>
        <TabsList className='mb-2 grid w-full grid-cols-2'>
          <TabsTrigger value='upcoming'>Próximos eventos</TabsTrigger>
          <TabsTrigger value='past'>Eventos pasados</TabsTrigger>
        </TabsList>
        <TabsContent value='upcoming'>
          <EventCardGroupSkeleton />
        </TabsContent>
        <TabsContent value='past'>
          <EventCardGroupSkeleton />
        </TabsContent>
      </Tabs>
    </main>
  )
}
