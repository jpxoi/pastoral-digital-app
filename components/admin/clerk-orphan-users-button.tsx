'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  IconExclamationCircle,
  IconLoader2,
  IconRefresh,
  IconTrash,
  IconChevronDown,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type OrphanUser = {
  id: string
  firstName: string
  lastName: string
  imageUrl: string
  email: string
}

export function ClerkOrphanUsersButton({
  grouped = false,
}: {
  grouped?: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<OrphanUser[]>([])
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')

  async function loadUsers() {
    setLoading(true)
    setError('')
    setConfirmation('')
    try {
      const response = await fetch('/api/admin/clerk-orphan-users', {
        cache: 'no-store',
      })
      const result = await response.json()
      if (!response.ok)
        throw new Error(result.error || 'No se pudo cargar la vista previa.')
      setUsers(result.users)
    } catch (cause) {
      const message =
        cause instanceof Error
          ? cause.message
          : 'No se pudo cargar la vista previa.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function cleanUsers() {
    setPending(true)
    setError('')
    const deletedIds: string[] = []
    try {
      const userIds = users.map(({ id }) => id)
      for (let offset = 0; offset < userIds.length; offset += 500) {
        const response = await fetch('/api/admin/clerk-orphan-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userIds: userIds.slice(offset, offset + 500),
            confirmation,
          }),
        })
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || 'No se pudo limpiar Clerk.')
        }
        deletedIds.push(...result.deletedIds)
      }
      setUsers((current) =>
        current.filter(({ id }) => !deletedIds.includes(id))
      )
      setConfirmation('')
      toast.success(`Se eliminaron ${deletedIds.length} usuarios de Clerk.`)
      router.refresh()
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : 'No se pudo limpiar Clerk.'
      if (deletedIds.length) {
        setUsers((current) =>
          current.filter(({ id }) => !deletedIds.includes(id))
        )
        setError(
          `Se eliminaron ${deletedIds.length} usuarios antes del error. ${message} Actualiza la vista previa para continuar.`
        )
      } else {
        setError(message)
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            size='icon-sm'
            variant={grouped ? 'default' : 'outline'}
            className='size-9 sm:size-8'
            aria-label='Más acciones'
            title='Más acciones'
          >
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          onCloseAutoFocus={(event) => {
            if (open) event.preventDefault()
          }}
        >
          <DropdownMenuItem
            variant='destructive'
            onSelect={() => {
              setOpen(true)
              void loadUsers()
            }}
          >
            <IconTrash />
            Limpiar Clerk
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!pending) setOpen(nextOpen)
        }}
      >
        <DialogContent
          className='max-h-[85vh] gap-4 overflow-y-auto p-5 text-left sm:max-w-xl'
          style={{ width: 'min(36rem, calc(100vw - 2rem))' }}
        >
          <DialogHeader>
            <DialogTitle>Limpiar usuarios de Clerk</DialogTitle>
            <DialogDescription>
              Cuentas de Clerk sin perfil en la aplicación.
            </DialogDescription>
          </DialogHeader>

          <div className='flex items-center justify-between gap-3'>
            <div aria-live='polite' aria-atomic='true'>
              {loading ? (
                <Badge variant='secondary' className='gap-1.5'>
                  <IconLoader2 className='animate-spin' />
                  Cargando
                </Badge>
              ) : users.length > 0 ? (
                <Badge variant='secondary'>
                  {users.length} {users.length === 1 ? 'cuenta' : 'cuentas'}
                </Badge>
              ) : null}
            </div>
            <Button
              type='button'
              size='sm'
              variant='outline'
              onClick={() => void loadUsers()}
              disabled={loading || pending}
            >
              <IconRefresh />
              Actualizar
            </Button>
          </div>

          {loading ? (
            <div
              aria-hidden='true'
              className='max-h-64 space-y-2 overflow-y-auto'
            >
              <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
                <div className='bg-muted size-9 animate-pulse rounded-full' />
                <div className='flex-1 space-y-2'>
                  <div className='bg-muted h-3 w-1/2 animate-pulse rounded' />
                  <div className='bg-muted h-3 w-2/3 animate-pulse rounded' />
                </div>
              </div>
            </div>
          ) : users.length ? (
            <div className='max-h-64 space-y-2 overflow-y-auto'>
              {users.map((user) => {
                const name = [user.firstName, user.lastName]
                  .filter(Boolean)
                  .join(' ')
                const initials = [user.firstName, user.lastName]
                  .filter(Boolean)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()

                return (
                  <div
                    key={user.id}
                    className='bg-card grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 rounded-lg border px-3 py-2'
                  >
                    <Avatar className='row-span-2 size-9'>
                      <AvatarImage src={user.imageUrl} alt='' />
                      <AvatarFallback className='text-xs font-medium'>
                        {initials || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex min-w-0 items-center justify-between gap-3'>
                      <p className='truncate text-sm font-medium'>
                        {name || 'Sin nombre'}
                      </p>
                      <p
                        className='text-muted-foreground max-w-40 shrink-0 truncate text-right font-mono text-xs'
                        title={user.id}
                      >
                        {user.id}
                      </p>
                    </div>
                    <p className='text-muted-foreground min-w-0 truncate text-sm'>
                      {user.email || 'Sin correo'}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
              No hay cuentas para limpiar.
            </div>
          )}

          {users.length > 0 && !loading && (
            <div className='space-y-4'>
              <Alert
                variant='destructive'
                className='border-red-200 bg-red-50 text-left'
              >
                <IconExclamationCircle />
                <AlertTitle>Eliminación permanente</AlertTitle>
                <AlertDescription className='text-xs whitespace-nowrap'>
                  Las cuentas listadas se borrarán de Clerk y no podrán
                  recuperarse.
                </AlertDescription>
              </Alert>
              <div className='space-y-2'>
                <Label htmlFor='clerk-cleanup-confirmation'>
                  Escribe ELIMINAR
                </Label>
                <Input
                  id='clerk-cleanup-confirmation'
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  autoComplete='off'
                  spellCheck={false}
                  disabled={pending}
                />
              </div>
            </div>
          )}

          {error && (
            <p role='alert' className='text-destructive text-sm'>
              {error}
            </p>
          )}

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cerrar
            </Button>
            {users.length > 0 && !loading && (
              <Button
                type='button'
                variant='destructive-solid'
                onClick={() => void cleanUsers()}
                disabled={pending || confirmation !== 'ELIMINAR'}
              >
                {pending ? (
                  <IconLoader2 className='animate-spin' />
                ) : (
                  <IconTrash />
                )}
                {pending ? 'Eliminando…' : 'Eliminar cuentas'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
