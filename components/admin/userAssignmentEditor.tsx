'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { setUserAssignments } from '@/actions/user'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { validateAssignments } from '@/lib/assignments'
import type {
  AssignmentCatalog,
  AssignmentInput,
  UserWithAssignments,
} from '@/types/assignments'

export default function UserAssignmentEditor({
  user,
  catalog,
  onClose,
}: {
  user: UserWithAssignments
  catalog: AssignmentCatalog
  onClose: () => void
}) {
  const [assignments, setAssignments] = useState<AssignmentInput[]>(
    user.catechistAssignments.map((assignment) => ({
      type: assignment.type,
      programId: assignment.programId,
      communityId: assignment.communityAssignment?.communityId ?? null,
      responsibility: assignment.communityAssignment?.responsibility ?? null,
    }))
  )
  const [pending, setPending] = useState(false)
  const communion = catalog.programs.find(
    (program) => program.code === 'communion'
  )
  const options: { key: string; label: string; assignment: AssignmentInput }[] =
    [
      ...catalog.programs.map((program) => ({
        key: `program:${program.id}`,
        label: program.name,
        assignment: {
          type: 'program' as const,
          programId: program.id,
          communityId: null,
          responsibility: null,
        },
      })),
      ...(['coordinator', 'logistics'] as const).map((type) => ({
        key: type,
        label: type === 'coordinator' ? 'Coordinador' : 'Logística',
        assignment: {
          type,
          programId: null,
          communityId: null,
          responsibility: null,
        },
      })),
      ...(communion
        ? [
            {
              key: 'semillero',
              label: 'Semilleros',
              assignment: {
                type: 'semillero' as const,
                programId: communion.id,
                communityId: null,
                responsibility: null,
              },
            },
          ]
        : []),
    ]

  function updateAssignment(index: number, change: Partial<AssignmentInput>) {
    setAssignments((current) =>
      current.map((assignment, position) =>
        position === index ? { ...assignment, ...change } : assignment
      )
    )
  }

  async function save() {
    const error = validateAssignments(assignments, catalog)
    if (error) {
      toast.error(error)
      return
    }

    setPending(true)
    try {
      const result = await setUserAssignments(assignments, user.id)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      toast.success(result.success)
      onClose()
    } catch {
      toast.error('No se pudieron guardar las asignaciones.')
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose()
      }}
    >
      <DialogContent className='max-h-[85dvh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Asignaciones de {user.firstName}</DialogTitle>
          <DialogDescription>
            Selecciona hasta dos asignaciones. Semilleros es exclusivo de
            Comunión. La comunidad es opcional.
          </DialogDescription>
        </DialogHeader>
        <fieldset disabled={pending} className='flex flex-col gap-3'>
          <legend className='sr-only'>Asignaciones</legend>
          {options.map((option) => {
            const index = assignments.findIndex(
              (assignment) =>
                assignment.type === option.assignment.type &&
                assignment.programId === option.assignment.programId
            )
            const selected = index !== -1
            const exclusive = assignments.some(
              (assignment) => assignment.type === 'semillero'
            )
            const disabled =
              !selected &&
              (assignments.length >= 2 ||
                exclusive ||
                (option.assignment.type === 'semillero' &&
                  assignments.length > 0))
            const assignment = assignments[index]

            return (
              <div
                key={option.key}
                className='flex flex-col gap-2 rounded-lg border p-3'
              >
                <label className='flex items-center gap-2 text-sm font-medium'>
                  <input
                    type='checkbox'
                    checked={selected}
                    disabled={disabled}
                    onChange={() =>
                      setAssignments((current) =>
                        selected
                          ? current.filter((_, position) => position !== index)
                          : [...current, option.assignment]
                      )
                    }
                  />
                  {option.label}
                </label>
                {selected && assignment.programId && (
                  <>
                    <label className='flex flex-col gap-1 text-sm'>
                      Comunidad
                      <select
                        className='bg-background rounded-md border p-2'
                        value={assignment.communityId ?? ''}
                        onChange={(event) =>
                          updateAssignment(index, {
                            communityId: event.target.value || null,
                            responsibility: event.target.value
                              ? assignment.type === 'semillero'
                                ? 'semillero'
                                : 'guide'
                              : null,
                          })
                        }
                      >
                        <option value=''>Sin comunidad</option>
                        {catalog.communities
                          .filter(
                            (community) =>
                              community.programId === assignment.programId
                          )
                          .map((community) => (
                            <option key={community.id} value={community.id}>
                              {community.name}
                            </option>
                          ))}
                      </select>
                    </label>
                    {assignment.communityId &&
                      assignment.type === 'program' && (
                        <label className='flex flex-col gap-1 text-sm'>
                          Responsabilidad
                          <select
                            className='bg-background rounded-md border p-2'
                            value={assignment.responsibility ?? ''}
                            onChange={(event) =>
                              updateAssignment(index, {
                                responsibility: event.target.value as
                                  'guide' | 'advisor',
                              })
                            }
                          >
                            <option value='guide'>Guía</option>
                            <option value='advisor'>Asesor</option>
                          </select>
                        </label>
                      )}
                    {assignment.communityId &&
                      assignment.type === 'semillero' && (
                        <p className='text-muted-foreground text-sm'>
                          Responsabilidad: Semillero
                        </p>
                      )}
                  </>
                )}
              </div>
            )
          })}
        </fieldset>
        <div className='flex justify-end gap-2'>
          <Button variant='outline' disabled={pending} onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={pending} onClick={() => void save()}>
            {pending ? 'Guardando...' : 'Guardar asignaciones'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
