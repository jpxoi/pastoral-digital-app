import type { ReactNode } from 'react'

export default function PageActions({ children }: { children: ReactNode }) {
  return (
    <div className='flex w-full flex-wrap items-center justify-end gap-2'>
      {children}
    </div>
  )
}
