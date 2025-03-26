import { currentUser } from '@clerk/nextjs/server'
import { getAttendanceRecordsByUserId } from '@/queries/select'
import { SimpleDataTable } from '@/components/ui/simple-data-table'
import { UserAttendanceColumns } from '@/components/dashboard/userAttendanceColumns'

export default async function AttendanceTable() {
  const user = await currentUser()
  const attendanceRecords = await getAttendanceRecordsByUserId(
    user?.id as string
  )

  return (
    <div className='flex w-full flex-col gap-2'>
      <h1 className='text-left text-lg font-bold'>Mis Asistencias</h1>
      <SimpleDataTable
        columns={UserAttendanceColumns}
        data={attendanceRecords}
      />
    </div>
  )
}
