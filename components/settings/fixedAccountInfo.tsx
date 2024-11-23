import { auth, currentUser } from '@clerk/nextjs/server'
import { CopyAccountIDButton } from '@/components/settings/copyAccountIDButton'

export default async function AccountInfo() {
  const user = await currentUser()

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-row flex-wrap items-center justify-between gap-1.5'>
        <div className='flex max-w-full flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Identificador de Cuenta
          </h5>
          <p className='max-w-full truncate text-sm text-gray-800'>
            {user?.id as string}
          </p>
        </div>
        <CopyAccountIDButton accountID={user?.id as string} />
      </div>

      <div className='flex w-full flex-row flex-wrap items-center justify-between gap-1.5'>
        <div className='flex max-w-full flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Correo Electrónico
          </h5>
          <p className='max-w-full truncate text-sm text-gray-800'>
            {user?.primaryEmailAddress as unknown as string}
          </p>
        </div>
      </div>
    </div>
  )
}
