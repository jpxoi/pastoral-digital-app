import { IconCheck, IconX } from '@tabler/icons-react'

export const ScanErrorScreen = () => {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-red-600 text-white'>
      <IconX className='size-64 sm:size-72 md:size-80' />
    </div>
  )
}

export const ScanSuccessScreen = () => {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center bg-green-600 text-white'>
      <IconCheck className='size-64 sm:size-72 md:size-80' />
    </div>
  )
}
