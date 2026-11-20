import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import BirthdayGrid from '@/components/birthdays/birthdayGrid'
import BirthdayGridSkeleton from '@/components/birthdays/birthdayGridSkeleton'
import { Suspense } from 'react'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Cumpleaños | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.BIRTHDAYS_VIEW)

  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Cumpleaños' />} />
      <Suspense fallback={<BirthdayGridSkeleton />}>
        <BirthdayGrid />
      </Suspense>
    </div>
  )
}
