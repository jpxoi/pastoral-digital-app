import AttendanceSection from '@/components/dashboard/attendanceSection'
import PastoralId from '@/components/dashboard/pastoralID'
import OfflineAlert from '@/components/shared/offlineAlert'

export default function PastoralDigitalPage() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 py-4 md:p-10'>
      <OfflineAlert />

      {/* Sección de Pastoral ID y Asistencia */}
      <div className='flex w-full flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-evenly'>
        <div className='flex flex-col items-center justify-start gap-4'>
          <PastoralId />
        </div>
        <div className='mt-8 flex flex-col items-center justify-start gap-4 lg:ml-4 lg:mt-0 lg:max-h-[80vh] xl:ml-0'>
          <AttendanceSection />
        </div>
      </div>
    </main>
  )
}
