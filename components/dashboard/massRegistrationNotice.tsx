import {
  IconCircleCheck,
  IconCircleMinus,
  IconClock,
} from '@tabler/icons-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SundayMassStatus } from '@/types'

const noticeAppearance = {
  [SundayMassStatus.PENDING]: {
    icon: IconClock,
    className: 'border-border bg-muted/50 text-muted-foreground',
  },
  [SundayMassStatus.ACCEPTED]: {
    icon: IconCircleCheck,
    className:
      'border-emerald-200 bg-emerald-50/60 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300',
  },
  [SundayMassStatus.REJECTED]: {
    icon: IconCircleMinus,
    className:
      'border-amber-200 bg-amber-50/60 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-300',
  },
  closed: {
    icon: IconClock,
    className: 'border-border bg-muted/50 text-muted-foreground',
  },
}

export default function MassRegistrationNotice({
  title,
  description,
  status = 'closed',
}: {
  title: string
  description: string
  status?: SundayMassStatus | 'closed'
}) {
  const { icon: Icon, className } = noticeAppearance[status]
  return (
    <Alert role='status' className={className}>
      <Icon aria-hidden='true' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
