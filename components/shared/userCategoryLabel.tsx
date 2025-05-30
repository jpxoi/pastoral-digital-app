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
      <Badge variant={'sky'} className='h-8 rounded-lg'>
        <IconBackpack className='size-4' />
        <span className='ml-2 text-nowrap'>Alumno</span>
      </Badge>
    ),
    alumni: (
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconSchoolOff className='size-4' />
        <span className='ml-2 text-nowrap'>Exalumno</span>
      </Badge>
    ),
    teacher: (
      <Badge variant={'violet'} className='h-8 rounded-lg'>
        <IconSchool className='size-4' />
        <span className='ml-2 text-nowrap'>Docente</span>
      </Badge>
    ),
  }

  return categoryMapping[category] || null
}
