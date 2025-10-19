import AttendanceSection from '@/components/dashboard/attendanceSection'
import OfflineAlert from '@/components/shared/offlineAlert'
import RegisterAlert from '@/components/shared/registerAlert'
import { Metadata } from 'next'
import { Suspense } from 'react'

import PastoralIdDialog from '@/components/dashboard/pastoralIdDialog'
import SundayMassDialog from '@/components/dashboard/sundayMassDialog'
import ErrorAlert from '@/components/shared/errorAlert'

export const metadata: Metadata = {
  title: 'Inicio | Pastoral Digital App',
}

export default function PastoralDigitalPage() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      {/* Alerta de que la aplicación dejara de funcionar el 31 de octubre de 2025 */}
      <ErrorAlert
        title='Pastoral Digital App estará disponible hasta el 31 de octubre de 2025'
        description='Gracias por todo lo compartido a través de la aplicación. El 31 de octubre la plataforma dejará de estar activa, pero el código quedará abierto para que, si en el futuro alguien desea continuar o mejorar la idea, tenga la libertad de hacerlo. ¡Gracias por la confianza y que Dios los bendiga siempre!'
      />

      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <Suspense fallback={null}>
        <RegisterAlert />
      </Suspense>

      {/* Sección de Pastoral ID y Asistencia */}
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
    </main>
  )
}
