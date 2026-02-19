import { Suspense } from 'react'
import { Metadata } from 'next'
import UsersTable from '@/components/admin/usersTable'
import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import ExportToCsvUsers from '@/components/shared/exportToCsvUsers'
import RevalidateButton from '@/components/shared/revalidateButton'

export const metadata: Metadata = {
  title: 'Administrar Catequistas | Pastoral Digital App',
}

export default function Page() {
  return (
    <>
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Administrar Catequistas
          </h1>
          <p className='text-sm text-neutral-500'>
            Esta es la lista de catequistas registrados en la aplicación.
          </p>
        </div>
        <div className='grid grid-cols-2 gap-2 sm:flex sm:items-center'>
          <RevalidateButton tag='users' />
          <ExportToCsvUsers />
        </div>
      </div>
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </>
  )
}
