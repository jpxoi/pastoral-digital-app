import { TableRow } from '@/types/interfaces'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'

export default function AttendanceTableRow({ row }: TableRow) {
  return (
    <tr className='border-b text-left odd:bg-white even:bg-gray-50 hover:bg-blue-50'>
      <td
        scope='row'
        className='text-nowrap px-6 py-4 font-medium text-gray-900'
      >
        {row['ID Asistencia']}
      </td>
      <td className='text-nowrap px-6 py-4'>
        {new Date(row['Fecha']).toLocaleDateString('es-PE', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </td>
      <td className='text-nowrap px-6 py-4'>
        {new Date(row['Hora']).toLocaleTimeString('es-PE', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </td>
      <td className='cursor-default text-nowrap px-6 py-4 font-medium'>
        <AttendanceStatusLabel status={row['Status']} />
      </td>
    </tr>
  )
}
