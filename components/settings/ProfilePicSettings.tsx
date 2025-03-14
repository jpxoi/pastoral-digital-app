import ChangeProfilePic from '@/components/settings/changeProfilePic'
import { currentUser } from '@clerk/nextjs/server'

export default async function ProfilePicSettings() {
  const user = await currentUser()
  return (
    <div className='flex w-full flex-col items-start gap-6 rounded-xl bg-white p-8 shadow-md'>
      <h5 className='text-xl font-medium text-gray-800'>Foto de Perfil</h5>
      <ChangeProfilePic
        userID={user?.id as string}
        userFullName={user?.fullName as string}
        avatarURL={user?.imageUrl as string}
      />
      <p className='text-xs text-gray-500'>
        Al cambiar tu foto de perfil, esta se actualizará en todos los dispositivos en los que hayas iniciado sesión. Si no ves los cambios, cierra sesión y vuelve a iniciarla.
      </p>
    </div>
  )
}
