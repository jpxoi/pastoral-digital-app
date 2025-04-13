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
  // Check if it's Sunday between 00:00 and 22:00 in Peru
  const peruDate = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'America/Lima' })
  )

  console.log('Peru Date:', peruDate)

  const isSunday = peruDate.getDay() === 0 // 0 is Sunday
  const hour = peruDate.getHours()

  console.log('Hour:', hour)

  // Early return if not Sunday or outside time range
  if (!isSunday || hour >= 22) {
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
