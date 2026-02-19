'use client'

import { Spinner } from '@/components/ui/spinner'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='overflow-y-scroll rounded-xl'>
      <SignUp fallback={<Spinner className='size-10 text-white' />} />
    </div>
  )
}
