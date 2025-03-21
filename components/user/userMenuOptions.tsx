import { JustifyIcon, LogOutIcon } from '@/components/icons/icons24'
import { currentUser } from '@clerk/nextjs/server'

export default async function UserMenuOptions() {
  const user = await currentUser()

  return (
    <div className='grid grid-cols-2 gap-1'>
      <a
        className='flex flex-row items-center justify-center gap-1 rounded-3xl rounded-r-md bg-white px-2 py-3 text-sm text-blue-500 hover:bg-blue-100 hover:text-blue-800'
        href={`https://docs.google.com/forms/d/e/1FAIpQLSd_iJ7BJaofM-yQUFNa9tDImNrdRVY0JoXqbLgpjmUxrFEIuA/viewform?usp=pp_url&entry.1528530871=${user?.id}&entry.858990924=${user?.fullName}`}
        target='_blank'
        rel='noreferrer'
      >
        <JustifyIcon />
        Justificar Falta
      </a>
      <a
        className='flex flex-row items-center justify-center gap-1 rounded-3xl rounded-l-md bg-white px-2 py-3 text-sm text-red-500 hover:bg-red-100 hover:text-red-800'
        href='/api/auth/logout'
      >
        <LogOutIcon />
        Cerrar Sesión
      </a>
    </div>
  )
}
