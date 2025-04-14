import { Suspense } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { IconQrcode } from '@tabler/icons-react'
import PastoralId from '@/components/dashboard/pastoralID'
import PastoralIDSkeleton from '@/components/dashboard/pastoralIDSkeleton'

export default function PastoralIdDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='max-sm:w-full' size={'sm'}>
          <IconQrcode />
          Mi Pastoral ID
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6 border-none'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <IconQrcode size={24} />
            Mi Pastoral ID
          </DialogTitle>
        </DialogHeader>
        <Suspense fallback={<PastoralIDSkeleton />}>
          <PastoralId />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
