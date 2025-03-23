import { Metadata } from 'next'
import OfflineAlert from '@/components/shared/offlineAlert'
import BirthdayGrid from '@/components/birthdays/birthdayGrid'
import BirthdayGridSkeleton from '@/components/birthdays/birthdayGridSkeleton'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Cumpleaños | Pastoral Digital App',
}

export default function Page() {
  return (
    <main className='flex h-full w-full flex-1 flex-col gap-4 overflow-y-scroll rounded-tl-2xl border border-neutral-200 bg-white p-4 pb-8 max-sm:max-h-[calc(100vh-3rem)] md:p-8'>
      <OfflineAlert />
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-semibold sm:text-2xl'>
          Próximos Cumpleaños
        </h1>
        <p className='text-sm text-neutral-500'>
          Aquí puedes ver los cumpleaños de los catequistas en los próximos
          días.
        </p>
      </div>
      <Suspense fallback={<BirthdayGridSkeleton />}>
        <BirthdayGrid />
      </Suspense>
    </main>
  )
}

export const dynamic = 'force-dynamic'
