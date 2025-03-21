import type { Metadata } from 'next'
import { CustomSidebar } from '@/components/dashboard/custom-sidebar'

export const metadata: Metadata = {
  title: 'Dashboard | Pastoral Digital App',
  description:
    'Pastoral Digital es una plataforma digital para uso interno de la Pastoral Mariana del CEP Nuestra Señora del Perpetuo Socorro',
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='mx-auto flex h-screen w-screen flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row'>
      <CustomSidebar />
      <div className='flex flex-1 bg-[#07309B]'>{children}</div>
    </div>
  )
}
