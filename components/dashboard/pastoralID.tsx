import PastoralIdQRCode from '@/components/dashboard/pastoraldQrCode'
import { auth, currentUser } from '@clerk/nextjs/server'
import PastoralIDSkeleton from './pastoralIDSkeleton'

export default async function PastoralId() {
  const user = await currentUser()

  if (!user) {
    return <PastoralIDSkeleton />
  }

  const isOnboarded =
    (await auth()).sessionClaims?.metadata.onboardingComplete === true

  return (
    <div
      className='mx-[-1.5rem] flex aspect-[9/11] w-[calc(100%+3rem)] flex-col gap-2 bg-cover bg-center p-8 pb-2 sm:gap-4 sm:p-16 sm:pb-4'
      style={{
        backgroundImage: 'url(/graphics/id-bg.svg)',
      }}
    >
      <div className='flex flex-grow flex-col items-center justify-start gap-2'>
        {!isOnboarded ? (
          <div className='m-0 mx-auto flex aspect-square h-auto w-full flex-col items-center justify-center rounded-lg bg-white p-4 text-center sm:max-w-sm'>
            <div className='flex aspect-square h-auto w-full flex-col items-center justify-center rounded-lg bg-blue-50 p-4 text-center'>
              <h3 className='text-xl text-blue-950'>Código QR no disponible</h3>
              <p className='text-sm text-blue-950'>
                Por favor, completa tu registro para acceder a esta
                funcionalidad.
              </p>
            </div>
          </div>
        ) : (
          <>
            <PastoralIdQRCode userId={user.id} />
            <div className='m-0 mx-auto h-auto w-full rounded-lg bg-white p-0 sm:max-w-sm'>
              <span className='text-sm text-muted-foreground'>{user?.id}</span>
            </div>
          </>
        )}
      </div>

      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='text-2xl font-semibold text-blue-950'>
          {user?.fullName}
        </h3>
        <p className='text-base text-blue-950'>Catequista</p>
      </div>
    </div>
  )
}
