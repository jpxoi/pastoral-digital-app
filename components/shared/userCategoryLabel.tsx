import {
  IconBackpack,
  IconSchool,
  IconSchoolOff,
} from '@tabler/icons-react'
import type { JSX } from 'react'
import { Badge } from '../ui/badge'
import { UserCategory } from '@/types'

export default function UserCategoryLabel({
  category,
}: {
  category: UserCategory
}) {
  const categoryMapping: { [key: string]: JSX.Element } = {
    alumni: (
      <Badge variant={'blue'} className='h-8 rounded-lg'>
        <IconBackpack className='size-4' />
        <span className='ml-2 text-nowrap'>Exalumno</span>
      </Badge>
    ),
    student: (
      <Badge variant={'emerald'} className='h-8 rounded-lg'>
        <IconSchoolOff className='size-4' />
        <span className='ml-2 text-nowrap'>Alumno</span>
      </Badge>
    ),
    teacher: (
      <Badge variant={'orange'} className='h-8 rounded-lg'>
        <IconSchool className='size-4' />
        <span className='ml-2 text-nowrap'>Docente</span>
      </Badge>
    ),
  }

  return categoryMapping[category] || null
}
