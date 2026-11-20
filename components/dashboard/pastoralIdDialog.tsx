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
        <Button size={'sm'}>
          <IconQrcode />
          Mi Pastoral ID
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100dvh-2rem)] gap-0 overflow-x-hidden overflow-y-auto border-none p-0'>
        <DialogHeader className='p-6 pr-12'>
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
