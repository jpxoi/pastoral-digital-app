import { IconLoader2 } from '@tabler/icons-react'

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <IconLoader2 className='animate-spin text-white' size={48} />
    </div>
  )
}
