'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconBuildingChurch } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SundayMassForm from './sundayMassForm'

export default function MassRegistrationDialog({
  initiallyOpen,
  closesAt,
}: {
  initiallyOpen: boolean
  closesAt: number
}) {
  const [open, setOpen] = useState(initiallyOpen)
  const router = useRouter()

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) return

    const url = new URL(window.location.href)
    if (url.pathname !== '/masses') return
    if (!url.searchParams.has('register') && !url.searchParams.has('sunday'))
      return

    url.searchParams.delete('register')
    url.searchParams.delete('sunday')
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='w-full self-start sm:w-auto sm:shrink-0'>
          <IconBuildingChurch aria-hidden='true' />
          Registrar misa
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6 border-none'>
        <DialogHeader>
          <DialogTitle>Registrar misa</DialogTitle>
        </DialogHeader>
        <SundayMassForm
          closesAt={closesAt}
          onSuccess={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
