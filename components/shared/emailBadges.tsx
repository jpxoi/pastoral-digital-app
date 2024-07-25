import { BellAlertIconMicro, CheckmarkIconMicro } from '@/components/icons/icons16'

export function VerifiedEmailBadge() {
  return (
    <div className='flex flex-row items-center justify-center gap-1 rounded-md bg-green-100 px-2 py-1 text-sm text-green-800 cursor-default'>
      <CheckmarkIconMicro />
      Verificado
    </div>
  )
}

export function PendingEmailBadge() {
  return (
    <div className='flex flex-row items-center justify-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-sm text-yellow-800 cursor-default'>
        <BellAlertIconMicro />
      Pendiente
    </div>
  )
}
