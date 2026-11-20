'use client'

import { useState } from 'react'
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
}: {
  initiallyOpen: boolean
}) {
  const [open, setOpen] = useState(initiallyOpen)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='self-start'>
          <IconBuildingChurch aria-hidden='true' />
          Registrar misa
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6 border-none'>
        <DialogHeader>
          <DialogTitle>Registrar misa</DialogTitle>
        </DialogHeader>
        <SundayMassForm />
      </DialogContent>
    </Dialog>
  )
}
