import type {
  AssignmentCatalog,
  AssignmentInput,
  CatechistAssignment,
  AssignmentType,
} from '@/types/assignments'

export const assignmentLabels = {
  communion: 'Comunión',
  confirmation: 'Confirmación',
  coordinator: 'Coordinador',
  logistics: 'Logística',
  semillero: 'Semilleros',
} as const

export function getAssignmentKey(assignment: CatechistAssignment) {
  return assignment.type === 'program'
    ? (assignment.program?.code ?? 'program')
    : assignment.type
}

export function getAssignmentLabel(assignment: CatechistAssignment) {
  const key = getAssignmentKey(assignment)
  return (
    assignmentLabels[key as keyof typeof assignmentLabels] ??
    assignment.program?.name ??
    'Programa'
  )
}

export type TurnAssignment = {
  type: AssignmentType
  program: { code: string | null } | null
}

export function getAttendanceTurn(
  assignments: readonly TurnAssignment[]
): 'first' | 'second' | null {
  if (
    assignments.some(
      (a) =>
        a.type === 'coordinator' ||
        a.type === 'logistics' ||
        ((a.type === 'program' || a.type === 'semillero') &&
          a.program?.code === 'communion')
    )
  )
    return 'first'
  if (
    assignments.some(
      (a) => a.type === 'program' && a.program?.code === 'confirmation'
    )
  )
    return 'second'
  return null
}

export function validateAssignments(
  assignments: readonly AssignmentInput[],
  catalog: AssignmentCatalog
): string | null {
  if (assignments.length > 2) return 'Solo se permiten hasta dos asignaciones.'
  if (
    assignments.some((a) => a.type === 'semillero') &&
    assignments.length !== 1
  )
    return 'Semilleros es una asignación exclusiva.'
  const seen = new Set<string>()
  for (const a of assignments) {
    const programAssignment = a.type === 'program' || a.type === 'semillero'
    const program = catalog.programs.find((p) => p.id === a.programId)
    if (programAssignment && !program) return 'Selecciona un programa válido.'
    if (a.type === 'semillero' && program?.code !== 'communion')
      return 'Semilleros solo puede pertenecer a Comunión.'
    if (
      !programAssignment &&
      (a.programId || a.communityId || a.responsibility)
    )
      return 'Coordinador y Logística no tienen programa ni comunidad.'
    const key = programAssignment ? `program:${a.programId}` : a.type
    if (seen.has(key))
      return 'No se puede repetir una asignación ni un programa.'
    seen.add(key)
    if (a.communityId) {
      const community = catalog.communities.find((c) => c.id === a.communityId)
      if (!community || community.programId !== a.programId)
        return 'La comunidad debe pertenecer al programa seleccionado.'
      if (
        a.type === 'program' &&
        (!a.responsibility || a.responsibility === 'semillero')
      )
        return 'Selecciona Guía o Asesor para la comunidad.'
      if (a.type === 'semillero' && a.responsibility !== 'semillero')
        return 'La responsabilidad comunitaria de un semillero debe ser Semillero.'
    } else if (a.responsibility)
      return 'Selecciona una comunidad para esta responsabilidad.'
    if (
      a.type === 'semillero' &&
      a.responsibility &&
      a.responsibility !== 'semillero'
    )
      return 'Semilleros no puede tener otra responsabilidad.'
  }
  return null
}
