import { IconBackpack, IconSchool, IconSchoolOff } from '@tabler/icons-react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'
import { UserCategory } from '@/types'

export default function UserCategoryLabel({
  category,
}: {
  category: UserCategory
}) {
  const categoryMapping: { [key: string]: JSX.Element } = {
    student: (
      <Badge variant={'sky'}>
        <IconBackpack />
        <span>Alumno</span>
      </Badge>
    ),
    alumni: (
      <Badge variant={'emerald'}>
        <IconSchoolOff />
        <span>Exalumno</span>
      </Badge>
    ),
    teacher: (
      <Badge variant={'violet'}>
        <IconSchool />
        <span>Docente</span>
      </Badge>
    ),
  }

  return categoryMapping[category] || null
}
