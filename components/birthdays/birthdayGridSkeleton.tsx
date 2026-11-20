import BirthdayCardSkeleton from '@/components/birthdays/birthdayCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSection } from '@/components/dashboard/dashboard-section'

export default function BirthdayGridSkeleton() {
  return (
    <DashboardSection title='Cumpleaños'>
      <div className='flex flex-col gap-5 text-left'>
        {[0, 1, 2].map((group) => (
          <section key={group} className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-5 w-6' />
            </div>
            <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <BirthdayCardSkeleton key={`${group}-${index}`} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </DashboardSection>
  )
}
