'use client'

import { Spinner } from '@/components/ui/spinner'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn fallback={<Spinner className='size-10 text-white' />} />
}
