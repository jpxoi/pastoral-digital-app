import type {
  SelectCatechistAssignment,
  SelectCommunity,
  SelectProgram,
  SelectUser,
} from '@/db/schema'

export type AssignmentType = SelectCatechistAssignment['type']
export type AssignmentResponsibility = 'guide' | 'advisor' | 'semillero'
export type AssignmentInput = {
  type: AssignmentType
  programId: string | null
  communityId: string | null
  responsibility: AssignmentResponsibility | null
}

export type CatechistAssignment = SelectCatechistAssignment & {
  program: SelectProgram | null
  communityAssignment: {
    assignmentId: string
    communityId: string
    responsibility: AssignmentResponsibility
    community: SelectCommunity
  } | null
}

export type UserWithAssignments = SelectUser & {
  catechistAssignments: CatechistAssignment[]
}

export type AssignmentCatalog = {
  programs: Pick<SelectProgram, 'id' | 'code' | 'name'>[]
  communities: Pick<SelectCommunity, 'id' | 'programId' | 'name'>[]
}
