import { useUserMenu } from '@/app/context/userMenuContext'
import { JustifyIcon, LogOutIcon } from '@/components/icons/icons24'
import Link from 'next/link'

export default function UserMenuOptions() {
  const { setIsOpen, userInfo, userSession } = useUserMenu()
  return (
    <div className='grid grid-cols-2 gap-1'>
      <a
        className='flex flex-row items-center justify-center gap-1 rounded-3xl rounded-r-md bg-white px-2 py-3 text-sm text-blue-500 hover:bg-blue-100 hover:text-blue-800'
        href={`https://docs.google.com/forms/d/e/1FAIpQLSd_iJ7BJaofM-yQUFNa9tDImNrdRVY0JoXqbLgpjmUxrFEIuA/viewform?usp=pp_url&entry.1528530871=${userInfo.userID}&entry.858990924=${userSession.name}`}
        target='_blank'
        rel='noreferrer'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <JustifyIcon />
        Justificar Falta
      </a>
      <Link
        className='flex flex-row items-center justify-center gap-1 rounded-3xl rounded-l-md bg-white px-2 py-3 text-sm text-red-500 hover:bg-red-100 hover:text-red-800'
        href='/api/auth/logout'
      >
        <LogOutIcon />
        Cerrar Sesión
      </Link>
    </div>
  )
}
