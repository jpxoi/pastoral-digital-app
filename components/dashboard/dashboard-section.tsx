import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import type { ReactNode } from 'react'

export function DashboardSection({
  title,
  count,
  href,
  children,
}: {
  title: string
  count?: number
  href?: string
  children: ReactNode
}) {
  return (
    <section className='flex min-w-0 flex-col gap-4 text-left'>
      <div className='flex min-h-7 items-center gap-2.5'>
        <h2 className='text-base font-semibold tracking-tight'>{title}</h2>
        {count !== undefined && (
          <span className='bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-medium tabular-nums'>
            {count.toLocaleString('es-PE')}
          </span>
        )}
        {href && (
          <Link
            href={href}
            className={`${buttonVariants({ variant: 'ghost', size: 'sm' })} ml-auto`}
          >
            Ver todas<span className='sr-only'>: {title}</span>
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}

export function DashboardEmpty({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>{icon}</EmptyMedia>
        <EmptyTitle>{children}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
