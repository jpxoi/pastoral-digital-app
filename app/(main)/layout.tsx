import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CustomSidebar } from '@/components/dashboard/customSidebar'
import { IosInstallPrompt } from '@/components/shared/iosInstallPrompt'
import OfflineAlert from '@/components/shared/offlineAlert'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { sessionClaims } = await auth.protect()

  if (sessionClaims.metadata?.onboardingComplete !== true) {
    redirect('/onboarding')
  }

  return (
    <SidebarProvider className='bg-background mx-auto h-dvh w-screen overflow-hidden'>
      <IosInstallPrompt />
      <CustomSidebar />
      <SidebarInset className='min-w-0 overflow-hidden'>
        <div className='bg-background flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto p-4 pb-8 md:p-8'>
          <SidebarTrigger className='text-primary -mb-2 shrink-0 self-start md:mb-0' />
          <OfflineAlert />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
