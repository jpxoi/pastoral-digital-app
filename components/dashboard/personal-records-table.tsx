'use client'

import { DataTable } from '@/components/ui/data-table'
import { UserAttendanceColumns } from './userAttendanceColumns'
import { SundayMassColumns } from './sundayMassColumns'
import type { FetchAttendancePropsWithEvent, FetchMassesProps } from '@/types'

type Props =
  | { kind: 'attendance'; data: FetchAttendancePropsWithEvent[] }
  | { kind: 'masses'; data: FetchMassesProps[] }

export function PersonalRecordsTable(props: Props) {
  return props.kind === 'attendance' ? (
    <DataTable columns={UserAttendanceColumns} data={props.data} />
  ) : (
    <DataTable columns={SundayMassColumns} data={props.data} />
  )
}
