import { getFotocheckLabel } from '@/components/fotochecks/model'
import { PastoralSignature } from '@/components/shared/pastoral-signature'
import PastoralIdQRCode from './pastoraldQrCode'
import type { CatechistAssignment } from '@/types/assignments'

export function PastoralIdCard({
  userId,
  name,
  assignments,
}: {
  userId: string
  name: string
  assignments: CatechistAssignment[]
}) {
  return (
    <div className='relative isolate flex w-full flex-col items-center overflow-hidden bg-white px-6 pt-7 pb-16 text-center'>
      <div className='z-10 flex w-full min-w-0 flex-col items-center gap-1'>
        <h3 className='max-w-72 text-xl leading-tight font-semibold break-words text-[#001944]'>
          {name}
        </h3>
        <p className='text-primary text-sm'>{getFotocheckLabel(assignments)}</p>
      </div>
      <div className='z-10 mt-4 w-full max-w-72 rounded-lg bg-white'>
        <PastoralIdQRCode userId={userId} />
      </div>
      <PastoralSignature
        variant='dark'
        sizes='112px'
        className='z-10 mt-2 h-auto w-28'
      />
      <svg
        viewBox='0 0 900 220'
        preserveAspectRatio='none'
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-14 w-full'
      >
        <path
          d='M0 90C240 180 430 70 600 120S800 170 900 30V220H0Z'
          fill='#1d5fd3'
        />
        <path
          d='M0 40C270 160 430 150 600 170S800 190 900 220H0Z'
          fill='#07309b'
        />
      </svg>
    </div>
  )
}
