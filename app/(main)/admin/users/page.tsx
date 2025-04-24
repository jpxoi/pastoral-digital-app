import { Suspense } from 'react'
import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import UsersTable from '@/components/admin/usersTable'
import UserTableSkeleton from '@/components/admin/userTableSkeleton'
import ExportToCsvUsers from '@/components/shared/exportToCsvUsers'

export const metadata: Metadata = {
  title: 'Administrar Catequistas | Pastoral Digital App',
}

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <Suspense fallback={null}>
        <OfflineAlert />
      </Suspense>
      <div className='flex justify-between gap-2 max-sm:flex-col'>
        <div className='flex flex-col gap-2 text-left'>
          <h1 className='text-xl font-semibold sm:text-2xl'>
            Administrar Catequistas
          </h1>
          <p className='text-sm text-neutral-500'>
            Esta es la lista de catequistas registrados en la aplicación.
          </p>
        </div>
        <ExportToCsvUsers />
      </div>
      <Suspense fallback={<UserTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </main>
  )
}
