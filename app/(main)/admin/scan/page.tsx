import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import QrScannerTab from '@/components/admin/qrScannerTab'

import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Escanear Código QR | Pastoral Digital App',
}

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Escanear Código QR
        </h1>
        <p className='text-sm text-neutral-500'>
          Registra la asistencia de los catequistas escaneando su código QR.
        </p>
      </div>
      <Tabs defaultValue='scan' className='w-full'>
        <TabsList className='mb-4 grid w-full grid-cols-2'>
          <TabsTrigger value='scan'>Escanear QR</TabsTrigger>
          <TabsTrigger disabled value='nfc'>
            Escanear NFC
          </TabsTrigger>
        </TabsList>
        <QrScannerTab />
      </Tabs>
    </main>
  )
}
