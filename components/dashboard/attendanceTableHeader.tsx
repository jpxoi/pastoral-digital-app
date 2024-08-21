export default function AttendanceTableHeader() {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 sticky top-0'>
      <tr className='bg-gray-200 text-left rtl:text-right'>
        <th scope='col' className='px-6 py-3'>
          ID
        </th>
        <th scope='col' className='px-6 py-3'>
          Fecha
        </th>
        <th scope='col' className='px-6 py-3'>
          Hora
        </th>
        <th scope='col' className='px-6 py-3'>
          Status
        </th>
      </tr>
    </thead>
  )
}
