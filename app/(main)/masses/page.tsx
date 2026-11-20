import { Suspense } from 'react'
import type { Metadata } from 'next'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import PageHeader from '@/components/shared/pageHeader'
import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import SundayMassTable from '@/components/dashboard/sundayMassTable'
import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'

export const metadata: Metadata = { title: 'Mis misas | Pastoral Digital App' }

export default async function Page() {
  await requirePermission(Permission.DASHBOARD_VIEW)
  return (
    <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6'>
      <PageHeader breadcrumb={<PageBreadcrumb label='Mis misas' />} />
      <Suspense fallback={<SundayMassTableSkeleton />}>
        <SundayMassTable preview={false} />
      </Suspense>
    </div>
  )
}
