import BirthdayCardSkeleton from './birthdayCardSkeleton'

export default function BirthdayGridSkeleton() {
  return (
    <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <BirthdayCardSkeleton key={i} />
      ))}
    </div>
  )
}
