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
      <main className='mb-8 mt-4 flex min-h-[78vh] w-full flex-col justify-start gap-4 px-4 lg:mt-8 lg:max-h-[80vh] xl:px-0'>
        <OfflineAlert />
        {/* Banner para completar registro */}
        <div className='mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-xl mb-4'>
          <div className='flex flex-col items-center p-8'>
            <h1 className='mb-3 text-center text-2xl font-bold lg:text-4xl'>
              ¡Hola, {user?.firstName}! 🎉
            </h1>
            <p className='mb-4 text-center text-gray-700'>
              Por favor, completa tu registro para acceder a todas las funciones
              de la plataforma.
            </p>
            <div className='mt-2 flex justify-center'>
              <a
                href='https://jpxoi.notion.site/1b7ee706b1a5802d9ef5da64be413fc3?pvs=105'
                className='transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:scale-105 hover:bg-blue-700'
                target='_blank'
                rel='noopener noreferrer'
              >
                Completar Registro
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Pastoral ID y Asistencia */}
        <div className='flex w-full flex-col items-center justify-center lg:flex-row lg:items-start lg:justify-evenly'>
          <div className='flex flex-col items-center justify-start gap-4'>
            <Suspense fallback={<PastoralIDSkeleton />}>
              <PastoralID />
            </Suspense>
          </div>
          <div className='mt-8 flex hidden flex-col items-center justify-start gap-4 lg:ml-4 lg:mt-0 lg:max-h-[80vh] xl:ml-0'>
            <AttendanceSection />
          </div>
        </div>
      </main>
    </>
  )
}
