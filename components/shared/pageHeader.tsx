import type { ReactNode } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

interface PageHeaderProps {
  breadcrumb?: ReactNode
}

export default function PageHeader({ breadcrumb }: PageHeaderProps) {
  return (
    <header className='flex w-full flex-col gap-3 text-left md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4'>
      <div className='flex min-w-0 items-center justify-between gap-3 md:flex-1'>
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
      </div>
    </header>
  )
}
