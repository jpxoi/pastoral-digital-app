import { StatusLabel } from '@/types/interfaces'

export default function AttendanceStatusLabel({ status }: StatusLabel) {
  const statusMapping: { [key: string]: JSX.Element } = {
    'A TIEMPO': (
      <span className='rounded-lg bg-green-50 p-2 text-green-700'>
        ✅ A TIEMPO
      </span>
    ),
    TARDANZA: (
      <span className='rounded-lg bg-yellow-50 p-2 text-yellow-700'>
        ⏰ TARDANZA
      </span>
    ),
    'DOBLE TARDANZA': (
      <span className='rounded-lg bg-orange-50 p-2 text-orange-700'>
        ⚠️ DOBLE TARDANZA
      </span>
    ),
    'FALTA JUSTIFICADA': (
      <span className='rounded-lg bg-blue-50 p-2 text-blue-700'>
        🤒 FALTA JUSTIFICADA
      </span>
    ),
    'TARDANZA JUSTIFICADA': (
      <span className='rounded-lg bg-purple-50 p-2 text-purple-700'>
        🕰️ TARDANZA JUSTIFICADA
      </span>
    ),
    SUSPENDIDO: (
      <span className='rounded-lg bg-red-50 p-2 text-red-700'>
        ⛔️ SUSPENDIDO
      </span>
    ),
    'ACCESO PRIORITARIO': (
      <span className='rounded-lg bg-green-50 p-2 text-green-700'>
        ⭐️ ACCESO PRIORITARIO
      </span>
    ),
  }

  return statusMapping[status] || <span />
}
