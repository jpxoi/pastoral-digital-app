import AttendanceSection from '@/components/dashboard/attendanceSection'
import PastoralId from '@/components/dashboard/pastoralID'
import OfflineAlert from '@/components/shared/offlineAlert'
import RegisterAlert from '@/components/shared/registerAlert'
import { Button } from '@/components/ui/button'
import { IconQrcode } from '@tabler/icons-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PastoralIDSkeleton from '@/components/dashboard/pastoralIDSkeleton'

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
      <div className='flex w-full flex-col items-center justify-start gap-4'>
        <div className='flex w-full justify-between sm:items-center gap-2 text-left max-sm:flex-col'>
          <h1 className='text-xl font-semibold sm:text-2xl'>Inicio</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='max-sm:w-full' size={'sm'}>
                <IconQrcode />
                Mi Pastoral ID
              </Button>
            </DialogTrigger>
            <DialogContent className='gap-6 border-none'>
              <DialogHeader>
                <DialogTitle className='flex items-center gap-2'>
                  <IconQrcode size={24} />
                  Mi Pastoral ID
                </DialogTitle>
              </DialogHeader>
              <Suspense fallback={<PastoralIDSkeleton />}>
                <PastoralId />
              </Suspense>
            </DialogContent>
          </Dialog>
        </div>

        <AttendanceSection />
      </div>
    </main>
  )
}
