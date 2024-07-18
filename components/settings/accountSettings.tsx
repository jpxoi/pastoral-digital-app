import { getSession, Session } from '@auth0/nextjs-auth0'
import '@uploadcare/react-uploader/core.css'
import Image from 'next/image'
import ChangePersonalInfo from '@/components/settings/changePersonalInfo'
import Link from 'next/link'
import ChangeProfilePic from '@/components/settings/changeProfilePic'
import { UserInfoProps } from '@/types/interfaces'
import { fetchUserInfoByEmail } from '@/app/utils/fetchUtils'
import { ReturnIcon } from '@/components/icons/icons16'

export default async function AccountSettings() {
  const { user } = (await getSession()) as Session
  const userInfo: UserInfoProps = await fetchUserInfoByEmail({
    email: user.email,
  })

  return (
    <div className='flex flex-col items-center justify-between gap-4'>
      <div className='flex max-w-md flex-col items-center justify-between gap-4 md:w-full md:max-w-screen-lg'>
        <Link
          href='/dashboard'
          className='flex flex-row items-center justify-start self-start rounded-md px-2 py-1.5 text-blue-600 hover:bg-blue-100'
        >
          <ReturnIcon />
          Volver
        </Link>
        <Image
          src={userInfo.avatarURL as string}
          unoptimized={true}
          className='h-28 w-28 rounded-full bg-blue-200'
          width={150}
          height={150}
          alt='Avatar'
        />
        <h1 className='text-2xl text-gray-800'>
          ¡Bienvenido(a) {user.nickname}
        </h1>
        <p className='text-sm text-gray-500'>
          Administra tu información, privacidad y seguridad para que la
          aplicación Pastoral Digital funcione mejor para ti.
        </p>
      </div>

      <div className='grid-reverse grid-cols1 grid max-w-md gap-4 md:max-w-screen-lg md:grid-cols-2'>
        <div className='flex md:flex-col'>
          <ChangePersonalInfo user={user} />
        </div>

        <div className='order-first flex md:order-last md:flex-col'>
          <ChangeProfilePic
            userID={userInfo.userID as string}
            userFullName={user.name}
            avatarURL={userInfo.avatarURL as string}
          />
        </div>
      </div>
    </div>
  )
}
