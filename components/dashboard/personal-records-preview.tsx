import type { ReactNode } from 'react'
import { tz } from '@date-fns/tz'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { IconCalendar, IconClock, IconPhoto } from '@tabler/icons-react'
import AttendanceStatusLabel from '@/components/shared/attendanceStatusLabel'
import SundayMassStatusLabel from '@/components/shared/sundayMassStatusLabel'
import type { FetchAttendancePropsWithEvent, FetchMassesProps } from '@/types'

type Props =
  | { kind: 'attendance'; data: FetchAttendancePropsWithEvent[] }
  | { kind: 'masses'; data: FetchMassesProps[] }

export type PreviewRecord = {
  id: string
  title: string
  timestamp: Date
  status: ReactNode
  evidenceUrl?: string
}

export default function PersonalRecordsPreview(props: Props) {
  const records: PreviewRecord[] =
    props.kind === 'attendance'
      ? props.data.map((record) => ({
          id: record.id,
          title: record.event.name,
          timestamp: new Date(record.checkInTime),
          status: <AttendanceStatusLabel status={record.status} />,
        }))
      : props.data.map((record) => ({
          id: record.id,
          title: record.parish,
          timestamp: new Date(record.createdAt),
          status: (
            <SundayMassStatusLabel
              status={record.status}
              verifier={record.verifier}
            />
          ),
          evidenceUrl: `https://jox4e78o3v.ufs.sh/f/${record.evidenceFileKey}`,
        }))

  return <RecordsPreviewList records={records} />
}

export function RecordsPreviewList({ records }: { records: PreviewRecord[] }) {
  return (
    <ul className='divide-y overflow-hidden rounded-xl border text-left'>
      {records.map((record) => (
        <li
          key={record.id}
          className='flex flex-wrap items-center gap-x-3 gap-y-2 p-4'
        >
          <div className='min-w-0 flex-1 basis-40 space-y-1.5'>
            <p className='text-sm leading-snug font-medium wrap-break-word'>
              {record.title}
            </p>
            <div className='text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs'>
              <time
                dateTime={record.timestamp.toISOString()}
                className='flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums'
              >
                <span className='inline-flex items-center gap-1'>
                  <IconCalendar
                    className='size-3.5 shrink-0'
                    aria-hidden='true'
                  />
                  {format(record.timestamp, 'PP', {
                    locale: es,
                    in: tz('America/Lima'),
                  })}
                </span>
                <span className='inline-flex items-center gap-1'>
                  <IconClock className='size-3.5 shrink-0' aria-hidden='true' />
                  {format(record.timestamp, 'HH:mm', {
                    in: tz('America/Lima'),
                  })}
                </span>
              </time>
              {record.evidenceUrl && (
                <a
                  href={record.evidenceUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`Ver evidencia de misa en ${record.title}`}
                  className='text-primary focus-visible:ring-ring inline-flex items-center gap-1 rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none'
                >
                  <IconPhoto className='size-3.5 shrink-0' aria-hidden='true' />
                  Ver evidencia
                </a>
              )}
            </div>
          </div>
          <div className='ml-auto shrink-0'>{record.status}</div>
        </li>
      ))}
    </ul>
  )
}
