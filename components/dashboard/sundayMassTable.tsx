import { currentUser } from '@clerk/nextjs/server'
import { getSundayMassesRecordsByUserId } from '@/queries/select'
import { SimpleDataTable } from '@/components/ui/simple-data-table'
import { SundayMassColumns } from './sundayMassColumns'

export default async function SundayMassTable() {
  const user = await currentUser()
  const massesRecords = await getSundayMassesRecordsByUserId(user?.id as string)

  return (
    <div className='flex w-full flex-col gap-2'>
      <h1 className='text-left text-lg font-bold'>Mis Misas</h1>
      <SimpleDataTable columns={SundayMassColumns} data={massesRecords} />
    </div>
  )
}
