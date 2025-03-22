'use client'
import { Printer } from 'lucide-react'

export default function PrintButton() {
  const handlePrint = () => {
    window.print()
  }
  return (
    <button
      onClick={handlePrint}
      className='inline-flex items-center rounded bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100 print:hidden'
    >
      <Printer className='mr-1 h-4 w-4' /> Imprimir
    </button>
  )
}
