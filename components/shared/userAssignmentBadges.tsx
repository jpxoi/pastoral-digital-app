import {
  IconCross,
  IconFlame,
  IconMoodKid,
  IconPackageExport,
  IconUserStar,
} from '@tabler/icons-react'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { getAssignmentKey, getAssignmentLabel } from '@/lib/assignments'
import type { CatechistAssignment } from '@/types/assignments'

const styles = {
  communion: { icon: IconCross, variant: 'amber' },
  confirmation: { icon: IconFlame, variant: 'red' },
  coordinator: { icon: IconUserStar, variant: 'emerald' },
  logistics: { icon: IconPackageExport, variant: 'purple' },
  semillero: { icon: IconMoodKid, variant: 'sky' },
} satisfies Record<
  string,
  { icon: typeof IconCross; variant: BadgeProps['variant'] }
>

export default function UserAssignmentBadges({
  assignments,
}: {
  assignments: readonly CatechistAssignment[]
}) {
  if (!assignments.length) {
    return (
      <span className='text-muted-foreground text-sm'>Sin asignaciones</span>
    )
  }

  return (
    <div className='flex w-max flex-nowrap gap-1.5'>
      {assignments.map((assignment) => {
        const key = getAssignmentKey(assignment)
        const style = styles[key as keyof typeof styles] ?? styles.communion
        const Icon = style.icon

        return (
          <Badge key={assignment.id} variant={style.variant}>
            <Icon />
            {getAssignmentLabel(assignment)}
          </Badge>
        )
      })}
    </div>
  )
}
