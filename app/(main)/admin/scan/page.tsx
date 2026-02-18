'use client'

import QrScannerTab from '@/components/admin/qrScannerTab'

import OfflineAlert from '@/components/shared/offlineAlert'

export default function Page() {
  return (
    <>
      <div className='flex flex-col gap-2 text-left'>
        <OfflineAlert />
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Escanear Código QR
        </h1>
        <p className='text-sm text-neutral-500'>
          Registra la asistencia de los catequistas escaneando su código QR.
        </p>
      </div>
      <QrScannerTab />
    </>
  )
}
