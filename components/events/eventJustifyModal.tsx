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
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

export function EventJustifyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='h-6 p-1 text-primary hover:bg-blue-50 hover:text-primary'
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
        {/* <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Justificación
            </Label>
            <Input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3'
            />
          </div>
        </div> */}
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
