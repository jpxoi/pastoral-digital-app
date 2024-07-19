export default function AttendanceTableRowSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, i) => (
        <tr
          key={i}
          className='border-b text-left odd:bg-white even:bg-gray-50 hover:bg-blue-50'
        >
          <td
            scope='row'
            className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'
          >
            <div className='h-5 w-20 animate-pulse bg-gray-300'></div>
          </td>
          <td className='px-6 py-4'>
            <div className='h-5 w-20 animate-pulse bg-gray-300'></div>
          </td>
          <td className='px-6 py-4'>
            <div className='h-5 w-20 animate-pulse bg-gray-300'></div>
          </td>
          <td className='px-6 py-4'>
            <div className='h-5 w-20 animate-pulse bg-gray-300'></div>
          </td>
        </tr>
      ))}
    </>
  )
}
