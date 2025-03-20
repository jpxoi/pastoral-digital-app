import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'

export default async function PastoralIdQRCode() {
  const user = await currentUser()

  return (
    <Image
      src={`https://quickchart.io/qr?text=${user?.id}&size=300&margin=2&dark=001944&ecLevel=H&format=svg`}
      className='m-0 mx-auto h-auto w-full max-w-xs rounded-lg p-0 sm:max-w-sm'
      width={300}
      height={300}
      unoptimized={true}
      alt='Pastoral ID QR Code'
    />
  )
}
