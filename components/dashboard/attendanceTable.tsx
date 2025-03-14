import AttendanceTableHeader from '@/components/dashboard/attendanceTableHeader'
import AttendanceTableBody from '@/components/dashboard/attendanceTableBody'
import { AttendanceProvider } from '@/app/context/attendanceContext'
import { currentUser } from '@clerk/nextjs/server'
import AttendanceTableRefresh from '@/components/dashboard/attendanceTableRefresh'

export default async function AttendanceTable() {
  const user = await currentUser()

  return (
    <AttendanceProvider userToken={user?.id as string}>
      <div className='mb-2 flex w-full flex-row items-center justify-center gap-4 lg:justify-end'>
        <AttendanceTableRefresh />
      </div>
      <div className='relative w-full overflow-x-auto rounded-lg shadow-md sm:max-w-screen-sm md:max-w-screen-md lg:max-h-[65vh]'>
        <table className='w-full text-left text-sm text-gray-500 rtl:text-right'>
          <AttendanceTableHeader />
          <AttendanceTableBody />
        </table>
      </div>
    </AttendanceProvider>
  )
}
