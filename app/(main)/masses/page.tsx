import { Suspense } from 'react'
import type { Metadata } from 'next'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import SundayMassTable from '@/components/dashboard/sundayMassTable'
import SundayMassTableSkeleton from '@/components/dashboard/sundayMassTableSkeleton'
import PageHeader from '@/components/shared/pageHeader'

export const metadata: Metadata = { title: 'Mis misas | Pastoral Digital App' }

export default async function Page() {
  await requirePermission(Permission.DASHBOARD_VIEW)
  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader />
      <Suspense fallback={<SundayMassTableSkeleton />}>
        <SundayMassTable preview={false} />
      </Suspense>
    </div>
  )
}
