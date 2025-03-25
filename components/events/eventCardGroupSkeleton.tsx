import EventCardSkeleton from './eventCardSkeleton'

export default function EventCardGroupSkeleton({
  count = 6,
}: {
  count?: number
}) {
  return (
    <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  )
}
