import { getSession, Session } from '@auth0/nextjs-auth0'
import {
  PendingEmailBadge,
  VerifiedEmailBadge,
} from '@/components/shared/emailBadges'
import { CopyAccountIDButton } from '@/components/settings/copyAccountIDButton'

export default async function AccountInfo() {
  const { user } = (await getSession()) as Session

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col items-start justify-between gap-1 lg:flex-row lg:items-center'>
        <div className='flex flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Identificador de Cuenta
          </h5>
          <p className='text-sm text-gray-800'>{user.sub as string}</p>
        </div>
        <CopyAccountIDButton accountID={user.sub as string} />
      </div>

      <div className='flex w-full flex-col items-start justify-between gap-1 lg:flex-row lg:items-center'>
        <div className='flex w-full flex-col items-start justify-center'>
          <h5 className='text-xs font-medium text-gray-600'>
            Correo Electrónico
          </h5>
          <p className='text-sm text-gray-800'>{user.email as string}</p>
        </div>
        {user.email_verified ? <VerifiedEmailBadge /> : <PendingEmailBadge />}
      </div>
    </div>
  )
}
