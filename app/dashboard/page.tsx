import AttendanceSection from '@/components/dashboard/attendanceSection'
import { Suspense } from 'react'
import PastoralIDSkeleton from '@/components/dashboard/pastoralIDSkeleton'
import OfflineAlert from '@/components/shared/offlineAlert'
import PastoralID from '@/components/dashboard/pastoralID'

export default async function PastoralDigitalPage() {
  return (
    <>
      <main className='mb-8 mt-4 flex min-h-[78vh] w-full flex-col justify-start gap-4 px-4 lg:mt-8 lg:max-h-[80vh] xl:px-0'>
        <OfflineAlert />
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
