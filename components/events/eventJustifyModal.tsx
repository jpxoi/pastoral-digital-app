import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function EventJustifyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='h-6 p-1 text-primary hover:text-primary'
        >
          Justificar Inasistencia
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Justificar Inasistencia</DialogTitle>
          <DialogDescription>
            Muy pronto podrás justificar tu inasistencia a un evento. Por el
            momento usa el formulario de Google.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild>
            <a
              href='https://forms.gle/Ro3FXViPPCXeEFV49'
              target='_blank'
              rel='noreferrer'
            >
              Justificar Inasistencia
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
