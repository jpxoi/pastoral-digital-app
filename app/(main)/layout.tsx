import { CustomSidebar } from '@/components/dashboard/customSidebar'
import OfflineAlert from '@/components/shared/offlineAlert'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mx-auto flex h-screen w-screen flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row'>
      <CustomSidebar />
      <div className='bg-primary flex flex-1 overflow-x-scroll'>
        <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
          <OfflineAlert />
          {children}
        </main>
      </div>
    </div>
  )
}
