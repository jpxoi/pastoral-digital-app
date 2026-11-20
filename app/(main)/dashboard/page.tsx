import Salutation from '@/components/dashboard/salutation'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import AttendanceSection from '@/components/dashboard/attendanceSection'

import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Inicio | Pastoral Digital App',
}

export default async function PastoralDigitalPage() {
  await requirePermission(Permission.DASHBOARD_VIEW)

  return (
    <div className='mx-auto flex w-full max-w-360 flex-col gap-6'>
      <PageHeader />
      <div className='pb-2'>
        <Salutation />
      </div>
      <AttendanceSection />
    </div>
  )
}
