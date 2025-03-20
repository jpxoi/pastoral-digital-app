import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import QrScannerTab from '@/components/admin/qrScannerTab'

export default function Page() {
  return (
    <div className='container mx-auto px-4 py-4'>
      <Tabs defaultValue='scan' className='w-full'>
        <TabsList className='mb-4 grid w-full grid-cols-2'>
          <TabsTrigger value='scan'>Escanear QR</TabsTrigger>
          {/* <TabsTrigger value='register'>Registro Manual</TabsTrigger> */}
        </TabsList>

        <QrScannerTab />

        {/* <AttendanceTab /> */}
      </Tabs>
    </div>
  )
}
