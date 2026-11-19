import { DashboardSvg } from '@/components/marketing/dashboard-svg'
import { IdCardSvg } from '@/components/marketing/id-card-svg'

export function LandingShowcase() {
  return (
    <div className='relative mx-auto w-full max-w-[34rem] lg:max-w-none'>
      <div className='pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[#07309b]/10 blur-3xl' />
      <div className='hidden lg:block lg:pl-[11.5rem]'>
        <DashboardSvg className='h-auto w-full drop-shadow-xl' />
      </div>
      <div className='mx-auto w-[min(100%,18rem)] lg:absolute lg:top-8 lg:left-0 lg:w-[12.75rem]'>
        <IdCardSvg className='h-auto w-full drop-shadow-xl' />
      </div>
    </div>
  )
}
