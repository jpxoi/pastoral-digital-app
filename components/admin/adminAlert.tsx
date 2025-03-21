import { IconAlertCircle } from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'

export default function AdminAlert({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Alert variant='destructive' className='bg-red-50 text-left'>
      <IconAlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
