'use client'

import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export function SiteHeaderAction() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <Button size='sm' asChild>
      <Link href={isLoaded && isSignedIn ? '/dashboard' : '/sign-in'}>
        {isLoaded && isSignedIn ? 'Ir al panel' : 'Iniciar sesión'}
      </Link>
    </Button>
  )
}
