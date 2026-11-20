'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  IconAlertTriangle,
  IconLoader2,
  IconRefresh,
  IconTrash,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  email: string
}

export function ClerkOrphanUsersButton() {
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
      if (!response.ok) throw new Error(result.error || 'No se pudo cargar la vista previa.')
      setUsers(result.users)
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : 'No se pudo cargar la vista previa.'
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
      setUsers((current) => current.filter(({ id }) => !deletedIds.includes(id)))
      setConfirmation('')
      toast.success(`Se eliminaron ${deletedIds.length} usuarios de Clerk.`)
      router.refresh()
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : 'No se pudo limpiar Clerk.'
      if (deletedIds.length) {
        setUsers((current) => current.filter(({ id }) => !deletedIds.includes(id)))
        setError(
          `Se eliminaron ${deletedIds.length} usuarios antes del error. ${message} Actualiza la vista previa para continuar.`
        )
      } else {
        setError(message)
      }
      toast.error(message)
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <Button
        size='sm'
        variant='outline'
        onClick={() => {
          setOpen(true)
          void loadUsers()
        }}
      >
        <IconTrash />
        Limpiar Clerk
      </Button>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!pending) setOpen(nextOpen)
        }}
      >
        <DialogContent className='max-h-[85vh] overflow-y-auto text-left sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Usuarios de Clerk sin registro en la base de datos</DialogTitle>
            <DialogDescription>
              Se comparan los usuarios de Clerk con los perfiles de esta
              aplicación. Solo se mostrarán cuentas cuyo ID no existe en la
              base de datos.
            </DialogDescription>
          </DialogHeader>

          <div className='flex items-center justify-between gap-3'>
            <p className='text-muted-foreground text-sm' aria-live='polite'>
              {loading
                ? 'Consultando Clerk y la base de datos…'
                : `${users.length} ${users.length === 1 ? 'usuario encontrado' : 'usuarios encontrados'}`}
            </p>
            <Button
              type='button'
              size='sm'
              variant='outline'
              onClick={() => void loadUsers()}
              disabled={loading || pending}
            >
              {loading ? (
                <IconLoader2 className='animate-spin' />
              ) : (
                <IconRefresh />
              )}
              Actualizar
            </Button>
          </div>

          {loading ? (
            <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
              Cargando vista previa…
            </div>
          ) : users.length ? (
            <div className='max-h-64 overflow-auto rounded-md border'>
              <table className='w-full text-sm'>
                <thead className='bg-muted/60 sticky top-0 text-left'>
                  <tr>
                    <th className='px-3 py-2 font-medium'>Nombre</th>
                    <th className='px-3 py-2 font-medium'>Correo</th>
                    <th className='px-3 py-2 font-medium'>ID de Clerk</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className='border-t'>
                      <td className='px-3 py-2'>
                        {[user.firstName, user.lastName]
                          .filter(Boolean)
                          .join(' ') || 'Sin nombre'}
                      </td>
                      <td className='px-3 py-2'>{user.email || '—'}</td>
                      <td className='text-muted-foreground max-w-40 truncate px-3 py-2 font-mono text-xs'>
                        {user.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-muted-foreground rounded-md border px-4 py-8 text-center text-sm'>
              No hay usuarios de Clerk sin perfil en la base de datos.
            </div>
          )}

          {users.length > 0 && !loading && (
            <div className='space-y-3 rounded-md border border-destructive/30 bg-destructive/5 p-3'>
              <div className='flex gap-2 text-sm'>
                <IconAlertTriangle className='text-destructive mt-0.5 size-4 shrink-0' />
                <p>
                  La eliminación es permanente en Clerk. Escribe{' '}
                  <strong>ELIMINAR</strong> para confirmar la limpieza de las{' '}
                  {users.length} cuentas listadas.
                </p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='clerk-cleanup-confirmation'>Confirmación</Label>
                <Input
                  id='clerk-cleanup-confirmation'
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  placeholder='ELIMINAR'
                  autoComplete='off'
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
                {pending ? 'Eliminando…' : `Eliminar ${users.length} usuarios`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
