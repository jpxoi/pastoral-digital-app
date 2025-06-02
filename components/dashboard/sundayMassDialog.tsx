import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { IconBuildingChurch } from '@tabler/icons-react'
import SundayMassForm from './sundayMassForm'

export default function SundayMassDialog() {
  const peruDate = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })
  )

  const isValidTimeframe =
    peruDate.getDay() === 0 || // Sunday
    (peruDate.getDay() === 1 && peruDate.getHours() < 18) // Monday before 6 PM

  if (!isValidTimeframe) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className='max-sm:w-full' size={'sm'}>
          <IconBuildingChurch />
          Registrar Misa
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6 border-none'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <IconBuildingChurch size={24} />
            Registrar Misa
          </DialogTitle>
        </DialogHeader>
        <SundayMassForm />
      </DialogContent>
    </Dialog>
  )
}
