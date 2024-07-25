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
        avatarURL={userInfo.avatarURL as string}
      />
      <p className='text-xs text-gray-500'>
        El cambio de tu foto de perfil puede tardar unos días en reflejarse en
        todas las plataformas de Pastoral Digital. Esto incluye el sistema de
        asistencia (ACR) y la aplicación web. Te recomendamos subir una imagen
        cuadrada en formato PNG o JPG para garantizar que tu foto de perfil se
        vea correctamente en todas las plataformas.
      </p>
    </div>
  )
}