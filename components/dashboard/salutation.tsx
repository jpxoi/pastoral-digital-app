'use client'

import { useUser } from '@clerk/nextjs'
import { useSyncExternalStore } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000)
  window.addEventListener('focus', onChange)
  return () => {
    window.clearInterval(timer)
    window.removeEventListener('focus', onChange)
  }
}

function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      hour: 'numeric',
      hourCycle: 'h23',
    }).format(new Date())
  )
  if (hour >= 5 && hour < 12) return 'Buenos días'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function getServerGreeting() {
  return null
}

export default function Salutation() {
  const { user, isLoaded } = useUser()
  const greeting = useSyncExternalStore(
    subscribe,
    getGreeting,
    getServerGreeting
  )
  const firstName = user?.firstName?.trim().split(/\s+/)[0]

  if (!isLoaded || !greeting) {
    return <Skeleton className='h-9 w-80 max-w-full self-start' />
  }

  return (
    <h1 className='w-full text-left text-xl font-semibold break-words sm:text-2xl'>
      {greeting}
      {firstName ? `, ${firstName}` : ''}
    </h1>
  )
}
