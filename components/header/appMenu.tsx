import { MenuIcon } from '@/components/icons/icons24'

export default function AppMenu() {
  return (
    <div className='flex items-center justify-center'>
      <button className='flex cursor-not-allowed items-center gap-2 text-white/50'>
        <MenuIcon />
      </button>
    </div>
  )
}
