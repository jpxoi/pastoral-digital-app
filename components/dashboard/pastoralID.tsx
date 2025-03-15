import Image from 'next/image'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function PastoralID() {
  const user = await currentUser()

  return (
    <div className='pass-front group m-0 h-auto min-w-80 rounded-lg p-0 transition-all duration-300 sm:min-w-96 sm:max-w-sm'>
      <div className='group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-[#001944] bg-white drop-shadow-md transition-all duration-300 hover:drop-shadow-2xl'>
        <div className='relative h-full w-full'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://quickchart.io/qr?text=${user?.id}&size=300&margin=2&dark=001944&ecLevel=H&format=svg`}
            className='m-0 mx-auto h-auto w-full max-w-xs rounded-lg p-0 sm:max-w-sm'
            width={300}
            height={300}
            alt='Pastoral ID QR Code'
          />
          <div className='flex h-full flex-col items-center justify-center bg-[#001944] p-2'>
            <p className='text-balance text-xs text-blue-50'>
              Escanea este QR para verificar tu identidad
            </p>
          </div>
        </div>
        <div className='z-5 absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine' />
      </div>
    </div>
  )
}
