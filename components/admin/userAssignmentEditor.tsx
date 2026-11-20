'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { setUserAssignments } from '@/actions/user'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  IconCross,
  IconFlame,
  IconMoodKid,
  IconPackageExport,
  IconUserStar,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
      <DialogContent className='max-h-[85dvh] gap-0 overflow-hidden p-0 sm:max-w-lg'>
        <DialogHeader className='px-6 pt-6 pb-2 text-left'>
          <DialogTitle>Asignaciones</DialogTitle>
          <DialogDescription>
            {user.firstName} {user.lastName}
          </DialogDescription>
        </DialogHeader>
        <fieldset
          disabled={pending}
          className='flex max-h-[55dvh] flex-col gap-2 overflow-y-auto px-6 py-4'
        >
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

            const Icon =
              option.assignment.type === 'semillero'
                ? IconMoodKid
                : option.assignment.type === 'coordinator'
                  ? IconUserStar
                  : option.assignment.type === 'logistics'
                    ? IconPackageExport
                    : option.assignment.programId === communion?.id
                      ? IconCross
                      : IconFlame

            return (
              <div
                key={option.key}
                className={cn(
                  'rounded-xl border transition-colors',
                  selected
                    ? 'border-primary/40 bg-primary/5'
                    : cn(
                        'border-border',
                        disabled ? 'bg-muted/20' : 'hover:bg-muted/50'
                      )
                )}
              >
                <label
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 text-sm font-medium',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg',
                      selected
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className='size-4' />
                  </span>
                  <span className='flex-1'>{option.label}</span>
                  <Checkbox
                    checked={selected}
                    disabled={disabled}
                    onCheckedChange={() =>
                      setAssignments((current) =>
                        selected
                          ? current.filter((_, position) => position !== index)
                          : [...current, option.assignment]
                      )
                    }
                  />
                </label>
                {selected && assignment.programId && (
                  <div className='border-primary/10 grid gap-3 border-t px-3 py-3 sm:grid-cols-2'>
                    <label
                      className={cn(
                        'text-muted-foreground flex flex-col gap-1.5 text-xs font-medium',
                        !(
                          assignment.communityId &&
                          assignment.type === 'program'
                        ) && 'sm:col-span-2'
                      )}
                    >
                      Comunidad opcional
                      <Select
                        value={assignment.communityId ?? 'no-community'}
                        onValueChange={(value) =>
                          updateAssignment(index, {
                            communityId:
                              value === 'no-community' ? null : value,
                            responsibility:
                              value !== 'no-community'
                                ? assignment.type === 'semillero'
                                  ? 'semillero'
                                  : 'guide'
                                : null,
                          })
                        }
                      >
                        <SelectTrigger className='bg-background text-foreground h-9 w-full min-w-0 rounded-lg text-sm font-normal'>
                          <SelectValue placeholder='Sin comunidad' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='no-community'>
                            Sin comunidad
                          </SelectItem>
                          {catalog.communities
                            .filter(
                              (community) =>
                                community.programId === assignment.programId
                            )
                            .map((community) => (
                              <SelectItem
                                key={community.id}
                                value={community.id}
                              >
                                {community.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </label>
                    {assignment.communityId &&
                      assignment.type === 'program' && (
                        <label className='text-muted-foreground flex flex-col gap-1.5 text-xs font-medium'>
                          Responsabilidad
                          <Select
                            value={assignment.responsibility ?? 'guide'}
                            onValueChange={(value) =>
                              updateAssignment(index, {
                                responsibility: value as 'guide' | 'advisor',
                              })
                            }
                          >
                            <SelectTrigger className='bg-background text-foreground h-9 w-full min-w-0 rounded-lg text-sm font-normal'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='guide'>Guía</SelectItem>
                              <SelectItem value='advisor'>Asesor</SelectItem>
                            </SelectContent>
                          </Select>
                        </label>
                      )}
                    {assignment.communityId &&
                      assignment.type === 'semillero' && (
                        <p className='text-muted-foreground text-sm'>
                          Responsabilidad: Semillero
                        </p>
                      )}
                  </div>
                )}
              </div>
            )
          })}
        </fieldset>
        <div className='bg-muted/20 flex items-center justify-between gap-3 px-6 py-4'>
          <Badge variant='secondary' className='shrink-0'>
            {assignments.length} de 2
          </Badge>
          <div className='flex gap-2'>
            <Button variant='outline' disabled={pending} onClick={onClose}>
              Cancelar
            </Button>
            <Button disabled={pending} onClick={() => void save()}>
              {pending ? 'Guardando...' : 'Guardar asignaciones'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
