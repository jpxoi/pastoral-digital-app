import OfflineAlert from '@/components/shared/offlineAlert'
import { clerkClient } from '@clerk/nextjs/server'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const client = await clerkClient()
  const user = await client.users
    .getUser(userId)
    .then((user) => {
      return user
    })
    .catch((error) => {
      console.error(error)
    })

  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 max-sm:max-h-[calc(100vh-3rem)] md:p-10'>
      <OfflineAlert />
      <div className='flex flex-col gap-2 text-left'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          {user?.firstName} {user?.lastName}
        </h1>
        <p className='text-sm text-neutral-500'>
          Esta es la lista de catequistas registrados en la aplicación.
        </p>
      </div>
    </main>
  )
}
