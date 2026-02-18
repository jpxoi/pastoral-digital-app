import { Metadata } from 'next'
import AttendanceSection from '@/components/dashboard/attendanceSection'

import PastoralIdDialog from '@/components/dashboard/pastoralIdDialog'
import SundayMassDialog from '@/components/dashboard/sundayMassDialog'

export const metadata: Metadata = {
  title: 'Inicio | Pastoral Digital App',
}

export default function PastoralDigitalPage() {
  return (
    <div className='flex w-full flex-col items-center justify-start gap-4'>
      <div className='flex w-full justify-between gap-2 text-left max-sm:flex-col sm:items-center'>
        <h1 className='text-xl font-semibold sm:text-2xl'>Inicio</h1>
        <div className='flex flex-col gap-2 sm:flex-row-reverse'>
          <PastoralIdDialog />
          <SundayMassDialog />
        </div>
      </div>

      <AttendanceSection />
    </div>
  )
}
