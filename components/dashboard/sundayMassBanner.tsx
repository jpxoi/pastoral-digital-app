import { IconBuildingChurch } from '@tabler/icons-react'
import MassRegistrationDialog from './massRegistrationDialog'

export default function SundayMassBanner({
  initiallyOpen,
  closesAt,
}: {
  initiallyOpen: boolean
  closesAt: number
}) {
  return (
    <div className='border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
      <div className='flex min-w-0 items-start gap-3'>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full'>
          <IconBuildingChurch aria-hidden='true' className='size-5' />
        </div>
        <div className='min-w-0 space-y-1'>
          <h2 className='font-semibold'>
            ¿Ya participaste en la misa del domingo?
          </h2>
          <p className='text-muted-foreground text-sm'>
            Registra tu asistencia hasta el lunes a las 12:00 p. m.
          </p>
        </div>
      </div>
      <MassRegistrationDialog
        key={`${closesAt}:${initiallyOpen}`}
        initiallyOpen={initiallyOpen}
        closesAt={closesAt}
      />
    </div>
  )
}
