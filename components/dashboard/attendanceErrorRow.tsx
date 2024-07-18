import { ExclamationTriangle } from '@/components/icons/icons24'

export default function AttendanceErrorRow({ message }: { message: string }) {
  return (
    <tr>
      <td colSpan={5} className='p-3'>
        <div className='flex flex-row justify-center rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
          <span className='flex items-center'>
            <ExclamationTriangle />
          </span>
          <p className='ml-2 inline'>{message}</p>
        </div>
      </td>
    </tr>
  )
}
