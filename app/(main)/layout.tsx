import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CustomSidebar } from '@/components/dashboard/customSidebar'
import { IosInstallPrompt } from '@/components/shared/iosInstallPrompt'
import OfflineAlert from '@/components/shared/offlineAlert'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { hasRolePermission } from '@/lib/permissions'
import { PERMISSIONS } from '@/types/permissions'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { sessionClaims } = await auth.protect()

  if (sessionClaims.metadata?.onboardingComplete !== true) {
    redirect('/onboarding')
  }

  const permissions = PERMISSIONS.filter((permission) =>
    hasRolePermission(sessionClaims.metadata?.role, permission)
  )

  return (
    <SidebarProvider className='bg-background mx-auto h-dvh w-screen overflow-hidden'>
      <IosInstallPrompt />
      <CustomSidebar permissions={permissions} />
      <SidebarInset className='min-w-0 overflow-hidden'>
        <div className='bg-background flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto p-4 pb-8 md:p-8'>
          <OfflineAlert />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
