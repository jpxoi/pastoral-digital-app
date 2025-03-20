import { getUserById } from '@/queries/select'
import { currentUser } from '@clerk/nextjs/server'
import { ListCheckIcon, ListOrderedIcon, QrCodeIcon } from 'lucide-react'
import Link from 'next/link'

export default async function AppMenu() {
  const user = await currentUser()
  const userDb = await getUserById(user?.id || '')
  const { role } = userDb[0]

  return (
    <>
      {role === 'admin' ? (
        <div className='flex items-center justify-center gap-3'>
          <Link href='/admin/records' className='flex items-center gap-2 text-white'>
            <ListCheckIcon />
          </Link>
          <Link href='/admin/scan' className='flex items-center gap-2 text-white'>
            <QrCodeIcon />
          </Link>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <Link
            href='#'
            className='flex cursor-not-allowed items-center gap-2 text-white/50'
          >
            <QrCodeIcon />
          </Link>
        </div>
      )}
    </>
  )
}
