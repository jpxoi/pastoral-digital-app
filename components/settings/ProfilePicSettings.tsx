import ChangeProfilePic from '@/components/settings/changeProfilePic'
import { UserInfoProps } from '@/types/interfaces'
import { fetchUserInfoByEmail } from '@/utils/fetchUtils'
import { getSession, Session } from '@auth0/nextjs-auth0'

export default async function ProfilePicSettings() {
  const { user } = (await getSession()) as Session
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  })
  return (
    <div className='flex w-full flex-col items-start gap-6 rounded-xl bg-white p-8 shadow-md'>
      <h5 className='text-xl font-medium text-gray-800'>Foto de Perfil</h5>
      <ChangeProfilePic
        userID={userInfo.userID as string}
        userFullName={user.name}
        avatarURL={user.picture as string}
      />
      <p className='text-xs text-gray-500'>
        Al cambiar tu foto de perfil, esta se actualizará en todos los dispositivos en los que hayas iniciado sesión. Si no ves los cambios, cierra sesión y vuelve a iniciarla.
      </p>
    </div>
  )
}
