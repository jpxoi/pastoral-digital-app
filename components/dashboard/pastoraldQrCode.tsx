import Image from 'next/image'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function PastoralIdQRCode() {
  const user = await currentUser()
  const isOnboarded =
    (await auth()).sessionClaims?.metadata.onboardingComplete === true

  if (!isOnboarded) {
    return (
      <div className='flex aspect-square flex-col items-center justify-center rounded-lg bg-blue-50 p-4 text-center'>
        <h3 className='text-xl text-blue-950'>Código QR no disponible</h3>
        <p className='text-sm text-blue-950'>
          Por favor, completa tu registro para acceder a esta funcionalidad.
        </p>
      </div>
    )
  }

  return (
    <Image
      src={`https://quickchart.io/qr?text=${user?.id}&size=300&margin=2&dark=172554&ecLevel=H&format=svg`}
      className='m-0 mx-auto h-auto w-full rounded-lg p-0 sm:max-w-sm'
      width={300}
      height={300}
      unoptimized={true}
      alt='Pastoral ID QR Code'
    />
  )
}
