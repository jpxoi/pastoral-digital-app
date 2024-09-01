import { getSession, Session } from '@auth0/nextjs-auth0'
import '@uploadcare/react-uploader/core.css'
import Image from 'next/image'
import Link from 'next/link'
import { ReturnIcon } from '@/components/icons/icons16'
import PasswordSettings from '@/components/settings/passwordSettings'
import PersonalInfoSettings from '@/components/settings/personalInfoSettings'
import ProfilePicSettings from './ProfilePicSettings'

export default async function AccountSettings() {
  const { user } = (await getSession()) as Session

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
          src={user.picture as string}
          className='h-28 w-28 rounded-full bg-blue-200'
          width={150}
          height={150}
          alt='Avatar'
        />
        <h1 className='text-2xl text-gray-800'>¡Un gusto, {user.nickname}!</h1>
        <p className='text-sm text-gray-500'>
          Administra tu información, privacidad y seguridad para que la
          aplicación Pastoral Digital funcione mejor para ti.
        </p>
      </div>

      <div className='grid-reverse mt-3 grid max-w-md grid-cols-1 gap-4 md:max-w-screen-lg md:grid-cols-2'>
        <PersonalInfoSettings />
        <ProfilePicSettings />
      </div>
      <div className='flex w-full flex-col gap-4'>
        <PasswordSettings />
      </div>
    </div>
  )
}
