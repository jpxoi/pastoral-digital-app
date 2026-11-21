'use client'

import { Spinner } from '@/components/ui/spinner'

import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createCommunity, updateCommunity } from '@/actions/community'
import type { AssignmentCatalog } from '@/types/assignments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormServerError } from '@/components/shared/form-server-error'
import type { FormActionError } from '@/types/form-actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function CommunityDialog({
  catalog,
  community,
  defaultProgramId,
  onClose,
}: {
  catalog: AssignmentCatalog
  community?: AssignmentCatalog['communities'][number]
  defaultProgramId?: string
  onClose: () => void
}) {
  const id = useId()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [programId, setProgramId] = useState(
    community?.programId ?? defaultProgramId ?? ''
  )
  const [error, setError] = useState<string>()
  const [fieldErrors, setFieldErrors] = useState<
    FormActionError['fieldErrors']
  >({})

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose()
      }}
    >
      <DialogContent className='text-left'>
        <DialogHeader>
          <DialogTitle>
            {community ? 'Editar comunidad' : 'Crear comunidad'}
          </DialogTitle>
          <DialogDescription>
            {community
              ? 'Actualiza el nombre de la comunidad dentro de su programa.'
              : 'Selecciona el programa y escribe el nombre de la comunidad.'}
          </DialogDescription>
        </DialogHeader>
        <form
          noValidate
          className='space-y-4'
          onSubmit={async (event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setPending(true)
            setError(undefined)
            setFieldErrors({})
            try {
              const result = community
                ? await updateCommunity({
                    id: community.id,
                    name: data.get('name'),
                  })
                : await createCommunity({ programId, name: data.get('name') })
              if (!result.success) {
                setFieldErrors(result.fieldErrors ?? {})
                const hiddenErrors = Object.entries(result.fieldErrors ?? {})
                  .filter(
                    ([field]) =>
                      field !== 'name' && (field !== 'programId' || !!community)
                  )
                  .flatMap(([, messages]) =>
                    messages?.[0] ? [messages[0]] : []
                  )
                const generalErrors = [result.error, ...hiddenErrors].filter(
                  Boolean
                )
                if (generalErrors.length) setError(generalErrors.join(' '))
                else if (!result.fieldErrors)
                  setError(
                    'No se pudo guardar la comunidad. Inténtalo nuevamente.'
                  )
                const firstField =
                  !community && result.fieldErrors?.programId?.length
                    ? 'program'
                    : result.fieldErrors?.name?.length
                      ? 'name'
                      : null
                if (firstField)
                  requestAnimationFrame(() =>
                    document.getElementById(`${id}-${firstField}`)?.focus()
                  )
                return
              }
              toast.success(result.success)
              onClose()
              router.refresh()
            } catch {
              setError('No se pudo guardar la comunidad. Inténtalo nuevamente.')
            } finally {
              setPending(false)
            }
          }}
        >
          <div className='space-y-2'>
            <Label htmlFor={`${id}-program`}>Programa</Label>
            <Select
              value={programId}
              onValueChange={(value) => {
                setProgramId(value)
                setFieldErrors((current) => ({
                  ...current,
                  programId: undefined,
                }))
              }}
              disabled={pending || !!community}
              required
            >
              <SelectTrigger
                id={`${id}-program`}
                className='w-full'
                aria-invalid={!!fieldErrors?.programId?.length}
                aria-describedby={
                  fieldErrors?.programId?.length
                    ? `${id}-program-error`
                    : undefined
                }
              >
                <SelectValue placeholder='Selecciona un programa' />
              </SelectTrigger>
              <SelectContent>
                {catalog.programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!community && fieldErrors?.programId?.[0] && (
              <p
                id={`${id}-program-error`}
                role='alert'
                className='text-destructive text-sm'
              >
                {fieldErrors.programId[0]}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor={`${id}-name`}>Nombre</Label>
            <Input
              id={`${id}-name`}
              name='name'
              defaultValue={community?.name ?? ''}
              required
              maxLength={200}
              disabled={pending}
              onChange={() =>
                setFieldErrors((current) => ({ ...current, name: undefined }))
              }
              aria-invalid={!!fieldErrors?.name?.length}
              aria-describedby={
                fieldErrors?.name?.length ? `${id}-name-error` : undefined
              }
            />
            {fieldErrors?.name?.[0] && (
              <p
                id={`${id}-name-error`}
                role='alert'
                className='text-destructive text-sm'
              >
                {fieldErrors.name[0]}
              </p>
            )}
          </div>
          <FormServerError message={error} />
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={pending}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={pending || !programId}
              aria-busy={pending}
            >
              {pending && <Spinner aria-hidden='true' />}
              {pending
                ? community
                  ? 'Guardando…'
                  : 'Creando…'
                : community
                  ? 'Guardar cambios'
                  : 'Crear comunidad'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
