import { IconExclamationCircle } from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ErrorAlert({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Alert variant='destructive' className='bg-red-50 text-left'>
      <IconExclamationCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
