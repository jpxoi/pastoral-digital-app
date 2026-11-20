import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { countAllUsers, getEventAttendanceStats } from '@/queries/select'
import {
  IconCalendarX,
  IconClockCheck,
  IconClockExclamation,
  IconPercentage,
} from '@tabler/icons-react'

export default async function EventDashboardCards({
  eventId,
}: {
  eventId: string
}) {
  const totalExpected = await countAllUsers()
  const { totalOnTime, totalLate, totalAbsentees } =
    await getEventAttendanceStats(eventId)

  const metrics = [
    {
      label: 'Asistencias',
      value: totalOnTime,
      icon: IconClockCheck,
      color: 'text-emerald-700',
      surface: 'border-emerald-200/70 bg-emerald-50 text-emerald-950',
    },
    {
      label: 'Tardanzas',
      value: totalLate,
      icon: IconClockExclamation,
      color: 'text-amber-700',
      surface: 'border-amber-200/70 bg-amber-50 text-amber-950',
    },
    {
      label: 'Faltas',
      value: totalAbsentees,
      icon: IconCalendarX,
      color: 'text-red-700',
      surface: 'border-red-200/70 bg-red-50 text-red-950',
    },
    {
      label: 'Tasa de asistencia',
      value:
        totalExpected > 0
          ? new Intl.NumberFormat('es-PE', {
              style: 'percent',
              maximumFractionDigits: 0,
            }).format((totalOnTime + totalLate) / totalExpected)
          : '-',
      icon: IconPercentage,
      color: 'text-primary',
      surface: 'border-primary/20 bg-primary/5 text-primary',
    },
  ]

  return (
    <div className='grid w-full grid-cols-2 gap-3 text-left lg:grid-cols-4'>
      {metrics.map(({ label, value, icon: Icon, color, surface }) => (
        <Item
          key={label}
          variant='outline'
          className={`min-w-0 px-3 py-4 sm:px-5 ${surface}`}
        >
          <ItemContent className='min-w-0 gap-3 text-left'>
            <ItemTitle
              className={`gap-2 text-xs font-normal sm:text-sm ${color}`}
            >
              <Icon className={`size-4 shrink-0 ${color}`} aria-hidden='true' />
              {label}
            </ItemTitle>
            <span className='text-3xl leading-none font-semibold tracking-tight tabular-nums'>
              {value.toLocaleString('es-PE')}
            </span>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}
