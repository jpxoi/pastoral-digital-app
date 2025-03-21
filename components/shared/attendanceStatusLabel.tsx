import { StatusLabel } from '@/types/interfaces'

import type { JSX } from "react";

export default function AttendanceStatusLabel({ status }: StatusLabel) {
  const statusMapping: { [key: string]: JSX.Element } = {
    'A TIEMPO': (
      <span className='text-nowrap rounded-lg bg-green-50 p-2 text-xs text-green-700'>
        ✅ A TIEMPO
      </span>
    ),
    TARDANZA: (
      <span className='text-nowrap rounded-lg bg-yellow-50 p-2 text-xs text-yellow-700'>
        ⏰ TARDANZA
      </span>
    ),
    'DOBLE TARDANZA': (
      <span className='text-nowrap rounded-lg bg-orange-50 p-2 text-xs text-orange-700'>
        ⚠️ DOBLE TARDANZA
      </span>
    ),
    'FALTA JUSTIFICADA': (
      <span className='text-nowrap rounded-lg bg-blue-50 p-2 text-xs text-blue-700'>
        🤒 FALTA JUSTIFICADA
      </span>
    ),
    'TARDANZA JUSTIFICADA': (
      <span className='text-nowrap rounded-lg bg-purple-50 p-2 text-xs text-purple-700'>
        🕰️ TARDANZA JUSTIFICADA
      </span>
    ),
    SUSPENDIDO: (
      <span className='text-nowrap rounded-lg bg-red-50 p-2 text-xs text-red-700'>
        ⛔️ SUSPENDIDO
      </span>
    ),
    'ACCESO PRIORITARIO': (
      <span className='text-nowrap rounded-lg bg-green-50 p-2 text-xs text-green-700'>
        ⭐️ ACCESO PRIORITARIO
      </span>
    ),
  }

  return statusMapping[status] || <span />
}
