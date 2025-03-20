import AttendanceSection from '@/components/dashboard/attendanceSection'
import { Suspense } from 'react'
import PastoralIDSkeleton from '@/components/dashboard/pastoralIDSkeleton'
import OfflineAlert from '@/components/shared/offlineAlert'
import PastoralID from '@/components/dashboard/pastoralID'
import { currentUser } from '@clerk/nextjs/server'

export default async function PastoralDigitalPage() {
  const user = await currentUser()

  return (
    <>
      <main className='container mx-auto p-4 md:p-8'>
        <OfflineAlert />

        {/* Sección de Pastoral ID y Asistencia */}
        <div className='flex w-full flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-evenly'>
          <div className='flex flex-col items-center justify-start gap-4'>
            <Suspense fallback={<PastoralIDSkeleton />}>
              <PastoralID />
            </Suspense>
          </div>
          <div className='mt-8 flex flex-col items-center justify-start gap-4 lg:ml-4 lg:mt-0 lg:max-h-[80vh] xl:ml-0'>
            <AttendanceSection />
          </div>
        </div>
      </main>
    </>
  )
}
