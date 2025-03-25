import EventCardGroupSkeleton from '@/components/events/eventCardGroupSkeleton'

export default function Loading() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>Eventos</h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver la lista de eventos.
        </p>
      </div>
      <div className='grid gap-4 text-left md:grid-cols-2 xl:grid-cols-3'>
        <div className='flex flex-col gap-2 xl:col-span-2'>
          <div className='grid gap-2 xl:grid-cols-2'>
            <h2 className='col-span-full text-lg font-medium'>
              Próximos eventos
            </h2>
            <EventCardGroupSkeleton count={6} />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='grid gap-2'>
            <h2 className='col-span-full text-lg font-medium'>
              Eventos pasados
            </h2>
            <EventCardGroupSkeleton count={3} />
          </div>
        </div>
      </div>
    </main>
  )
}
