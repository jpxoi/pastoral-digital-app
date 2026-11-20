import { Metadata } from 'next'
import BirthdayGrid from '@/components/birthdays/birthdayGrid'
import BirthdayGridSkeleton from '@/components/birthdays/birthdayGridSkeleton'
import { Suspense } from 'react'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageHeader from '@/components/shared/pageHeader'

export const metadata: Metadata = {
  title: 'Cumpleaños',
}

export default async function Page() {
  await requirePermission(Permission.BIRTHDAYS_VIEW)

  return (
    <div className='flex w-full flex-col gap-6'>
      <PageHeader />
      <Suspense fallback={<BirthdayGridSkeleton />}>
        <BirthdayGrid />
      </Suspense>
    </div>
  )
}
