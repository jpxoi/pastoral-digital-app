import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { IconBuildingChurch } from '@tabler/icons-react'
import { TZDate } from '@date-fns/tz'
import { connection } from 'next/server'
import SundayMassForm from './sundayMassForm'

export default async function SundayMassBanner() {
  await connection()
  const peruDate = new TZDate(new Date(), 'America/Lima')

  if (peruDate.getDay() !== 0) return null

  return (
    <div className='border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
      <div className='flex min-w-0 items-start gap-3'>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full'>
          <IconBuildingChurch aria-hidden='true' className='size-5' />
        </div>
        <div className='min-w-0 space-y-1'>
          <h2 className='font-semibold'>¿Ya participaste en la misa de hoy?</h2>
          <p className='text-muted-foreground text-sm'>
            Registra tu asistencia dominical para tenerla en tu historial.
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='shrink-0'>
            <IconBuildingChurch aria-hidden='true' />
            Registrar misa
          </Button>
        </DialogTrigger>
        <DialogContent className='gap-6 border-none'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <IconBuildingChurch size={24} aria-hidden='true' />
              Registrar Misa
            </DialogTitle>
          </DialogHeader>
          <SundayMassForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
