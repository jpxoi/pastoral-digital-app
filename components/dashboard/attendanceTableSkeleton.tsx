import { RefreshIconMicro } from '@/components/icons/icons16'
import AttendanceTableHeader from '@/components/dashboard/attendanceTableHeader'
import RowSkeleton from './attendanceTableRowSkeleton'

export default async function AttendanceTableSkeleton() {
  return (
    <>
      <div className='mb-2 flex w-full flex-row items-center justify-center gap-4 lg:justify-end'>
        <button
          className='flex flex-row items-center gap-1 text-sm text-blue-500 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300'
          disabled
        >
          <span className='animate-spin'>
            <RefreshIconMicro />
          </span>
          <span>Cargando</span>
        </button>
      </div>
      <div className='relative w-full overflow-x-auto rounded-lg shadow-md sm:max-w-screen-sm md:max-w-screen-md'>
        <table className='w-full text-left text-sm text-gray-500 rtl:text-right'>
          <AttendanceTableHeader />
          <tbody className='text-center'>
            <RowSkeleton rows={7} />
          </tbody>
        </table>
      </div>
    </>
  )
}
