import Link from 'next/link'
import { CloseIcon, EditIcon } from '@/components/icons/icons24'
import { DarkUserAvatar } from '@/components/user/userAvatar'
import { useUserMenu } from '@/app/context/userMenuContext'

export default function UserInfo() {
  const { userSession, userInfo, setIsOpen } = useUserMenu()

  return (
    <div className='flex min-w-80 flex-col gap-4 rounded-md'>
      <div className='flex items-center justify-between'>
        <div id='invisible' className='rounded-full p-1 text-lg text-[#e9eef6]'>
          <CloseIcon />
        </div>
        <p className='text-sm text-gray-600'>{userSession.email}</p>
        <button
          className='rounded-full p-1 text-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className='relative h-32 w-32 self-center'>
        <DarkUserAvatar { ...userSession.picture } />
      </div>

      <div className='flex flex-col justify-center'>
        <h4 className='text-xl font-medium text-gray-700 sm:font-normal'>
          ¡Hola, {userSession.nickname}!
        </h4>
        <p className='text-sm text-gray-500'>
          <b>ID: </b>
          {userInfo.userID}
        </p>
        <Link
          href='/dashboard/settings'
          onClick={() => setIsOpen((prev) => !prev)}
          className='mt-3 w-fit self-center rounded-full border border-blue-800 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 hover:text-blue-800'
        >
          Gestionar tu Pastoral Digital
        </Link>
      </div>
    </div>
  )
}
