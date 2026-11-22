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
        <SidebarTrigger className='max-md:size-8' />
        {breadcrumb && (
          <>
            <Separator
              orientation='vertical'
              className='my-auto h-5 shrink-0 md:h-4'
            />
            {breadcrumb}
          </>
        )}
      </div>
      {!breadcrumb && <PastoralIdDialog />}
    </header>
  )
}
