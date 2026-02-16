import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export default function OnboardingPromptSkeleton() {
  return (
    <CardContent>
      <div className='max-w-(--breakpoint-sm) space-y-4 text-left'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label>
              Nombres <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
            <p className='text-muted-foreground text-sm'>
              Ingresa tus nombres tal y como aparecen en tu documento de
              identidad (DNI).
            </p>
          </div>
          <div className='space-y-2'>
            <Label>
              Apellidos <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
            <p className='text-muted-foreground text-sm'>
              Escribe tus apellidos completos, según tu DNI.
            </p>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label>Apelativo</Label>
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Label>
              Nombre de usuario <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label>
              Correo electrónico <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Label>
              Número de teléfono <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label>
              Fecha de nacimiento <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Label>
              Vínculo con la institución <span className='text-red-500'>*</span>
            </Label>
            <Skeleton className='h-10 w-full' />
          </div>
        </div>

        <div className='items-top flex space-x-2'>
          <Skeleton className='h-4 w-4' />
          <div className='grid gap-1.5 leading-none'>
            <h3 className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Sacramento de la confirmación
            </h3>
            <p className='text-muted-foreground text-sm'>
              Doy fe de que he recibido el sacramento de la confirmación.
            </p>
          </div>
        </div>
        <Button disabled={true}>Completar Registro</Button>
      </div>
    </CardContent>
  )
}
