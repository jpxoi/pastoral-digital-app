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
        <Button
          size={'sm'}
          aria-label='Mi Pastoral ID'
          className='max-sm:size-8 max-sm:gap-0 max-sm:px-0'
        >
          <IconQrcode />
          <span className='max-sm:hidden'>Mi Pastoral ID</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[calc(100dvh-2rem)] gap-0 overflow-x-hidden overflow-y-auto border-none p-0 sm:max-w-sm'>
        <DialogHeader className='border-b p-4 pr-12'>
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
