import PastoralIdQRCode from '@/components/dashboard/pastoraldQrCode'
import { currentUser } from '@clerk/nextjs/server'
import PastoralIDSkeleton from './pastoralIDSkeleton'
import { getUserSchedule } from '@/queries/select'
import { UserSchedule } from '@/types'

export default async function PastoralId() {
  const user = await currentUser()

  if (!user) {
    return <PastoralIDSkeleton />
  }

  const userSchedule = (await getUserSchedule(user.id)) as {
    schedule: UserSchedule | null
  }

  const scheduleLabels = {
    [UserSchedule.FULL_TIME]: 'Catequista',
    [UserSchedule.CONFIRMACION]: 'Catequista de Confirmación',
    [UserSchedule.PRIMERA_COMUNION]: 'Catequista de Primera Comunión',
    [UserSchedule.SEMILLEROS]: 'Mini Catequista',
    [UserSchedule.COORDINADOR]: 'Coordinador',
    [UserSchedule.LOGISTICA]: 'Logística',
  }

  const schedule =
    userSchedule?.schedule && scheduleLabels[userSchedule.schedule]
      ? scheduleLabels[userSchedule.schedule]
      : 'Catequista'

  return (
    <div
      className='-mx-6 flex aspect-9/11 w-[calc(100%+3rem)] flex-col gap-2 bg-cover bg-center p-8 pb-2 sm:gap-4 sm:p-16 sm:pb-4'
      style={{
        backgroundImage: 'url(/graphics/id-bg.svg)',
      }}
    >
      <div className='flex grow flex-col items-center justify-start gap-2'>
        <PastoralIdQRCode userId={user.id} />
        <div className='m-0 mx-auto h-auto w-full rounded-lg bg-white p-0 sm:max-w-sm'>
          <span className='text-muted-foreground text-sm'>{user?.id}</span>
        </div>
      </div>

      <div className='flex w-full flex-col items-center justify-center'>
        <h3 className='text-card-foreground text-2xl font-bold md:text-3xl'>
          {user?.fullName}
        </h3>
        <p className='text-base text-blue-950'>{schedule}</p>
      </div>
    </div>
  )
}
