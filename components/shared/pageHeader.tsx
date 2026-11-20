import type { ReactNode } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import PastoralIdDialog from '@/components/dashboard/pastoralIdDialog'

interface PageHeaderProps {
  breadcrumb?: ReactNode
}

export default function PageHeader({ breadcrumb }: PageHeaderProps) {
  return (
    <header className='flex w-full items-center justify-between gap-3 text-left'>
      <div className='flex min-w-0 flex-1 items-center gap-2'>
        <SidebarTrigger />
        {breadcrumb && (
          <>
            <Separator
              orientation='vertical'
              className='my-auto h-4 shrink-0'
            />
            {breadcrumb}
          </>
        )}
      </div>
      {!breadcrumb && <PastoralIdDialog />}
    </header>
  )
}
