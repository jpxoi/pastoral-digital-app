import { Suspense } from 'react'
import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import MassesTable from '@/components/admin/massesTable'
import MassesTableSkeleton from '@/components/admin/massesTableSkeleton'
import ExportToCsvMasses from '@/components/shared/exportToCsvMasses'
import RevalidateButton from '@/components/shared/revalidateButton'

export const metadata: Metadata = {
  title: 'Administrar Misas | Pastoral Digital App',
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
            Administrar Misas
          </h1>
          <p className='text-sm text-neutral-500'>
            Esta es la lista de misas registradas en la aplicación.
          </p>
        </div>
        <div className='grid grid-cols-2 gap-2 sm:flex sm:items-center'>
          <RevalidateButton tag='sundayMasses' />
          <ExportToCsvMasses />
        </div>
      </div>
      <Suspense fallback={<MassesTableSkeleton />}>
        <MassesTable />
      </Suspense>
    </main>
  )
}
