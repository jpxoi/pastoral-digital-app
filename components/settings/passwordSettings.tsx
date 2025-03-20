import { ShieldIcon } from '@/components/icons/icons24'
import ChangePasswordButton from '@/components/settings/changePasswordButton'
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function PasswordSettins() {
  const user = await currentUser()

  return (
    <div className='flex w-full flex-col items-start justify-between gap-6 rounded-xl bg-white px-8 py-8 shadow-md sm:flex-row sm:items-center'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <ShieldIcon />
        <h3 className='text-lg font-medium text-gray-800 md:text-xl'>
          Contraseña
        </h3>
      </div>
      <ChangePasswordButton
        userEmail={user?.primaryEmailAddress?.toString() || ''}
      />
    </div>
  )
}
