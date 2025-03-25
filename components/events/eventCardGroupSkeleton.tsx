import EventCardSkeleton from './eventCardSkeleton'

export default function EventCardGroupSkeleton({
  count = 4,
}: {
  count?: number
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </>
  )
}
