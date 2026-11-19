import { Metadata } from 'next'
import BirthdayGrid from '@/components/birthdays/birthdayGrid'
import BirthdayGridSkeleton from '@/components/birthdays/birthdayGridSkeleton'
import { Suspense } from 'react'
import { requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export const metadata: Metadata = {
  title: 'Cumpleaños | Pastoral Digital App',
}

export default async function Page() {
  await requirePermission(Permission.BIRTHDAYS_VIEW)

  return (
    <>
      <div className='flex flex-col gap-2 text-left'>
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
    </>
  )
}
