
import { getUserRole } from '@/lib/auth'
import { ListCheckIcon, QrCodeIcon } from 'lucide-react'
import Link from 'next/link'

export default async function AppMenu() {
  const role = await getUserRole()

  return (
    <>
      {role === 'admin' ? (
        <div className='flex items-center justify-center gap-3'>
          <Link
            href='/admin/records'
            className='flex items-center gap-2 text-white'
          >
            <ListCheckIcon />
          </Link>
          <Link
            href='/admin/scan'
            className='flex items-center gap-2 text-white'
          >
            <QrCodeIcon />
          </Link>
        </div>
      ) : null}
    </>
  )
}
