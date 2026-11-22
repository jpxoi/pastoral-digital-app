import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function PageActions({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:justify-end',
        className
      )}
    >
      {children}
    </div>
  )
}
