import AttendanceSection from '@/components/dashboard/attendanceSection'
import PastoralId from '@/components/dashboard/pastoralID'
import OfflineAlert from '@/components/shared/offlineAlert'
import RegisterAlert from '@/components/shared/registerAlert'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Inicio | Pastoral Digital App',
}

export default function PastoralDigitalPage() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <Suspense fallback={null}>
        <RegisterAlert />
      </Suspense>

      {/* Sección de Pastoral ID y Asistencia */}
      <div className='flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start md:justify-between'>
        <PastoralId />
        <AttendanceSection />
      </div>
    </main>
  )
}
