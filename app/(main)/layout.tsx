import { CustomSidebar } from '@/components/dashboard/customSidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mx-auto flex h-screen w-screen flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row'>
      <CustomSidebar />
      <div className='flex flex-1 overflow-x-scroll bg-primary'>{children}</div>
    </div>
  )
}
