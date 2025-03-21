import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import QrScannerTab from '@/components/admin/qrScannerTab'

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10'>
      <Tabs defaultValue='scan' className='w-full'>
        <TabsList className='mb-4 grid w-full grid-cols-2'>
          <TabsTrigger value='scan'>Escanear QR</TabsTrigger>
          {/* <TabsTrigger value='register'>Registro Manual</TabsTrigger> */}
        </TabsList>

        <QrScannerTab />

        {/* <AttendanceTab /> */}
      </Tabs>
    </main>
  )
}
