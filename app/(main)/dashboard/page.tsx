import PageActions from '@/components/shared/pageActions'
import Salutation from '@/components/dashboard/salutation'
import PageHeader from '@/components/shared/pageHeader'
import { Metadata } from 'next'
import AttendanceSection from '@/components/dashboard/attendanceSection'

import PastoralIdDialog from '@/components/dashboard/pastoralIdDialog'
import SundayMassDialog from '@/components/dashboard/sundayMassDialog'
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
      <div className='flex w-full flex-row items-center justify-between gap-4 pb-2'>
        <div className='min-w-0 flex-1'>
          <Salutation />
        </div>
        <div className='shrink-0'>
          <PageActions>
            <PastoralIdDialog />
            <SundayMassDialog />
          </PageActions>
        </div>
      </div>
      <AttendanceSection />
    </div>
  )
}
