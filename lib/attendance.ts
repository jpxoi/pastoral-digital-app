import { AttendanceStatus } from '@/types'

// Status thresholds in minutes
const STATUS_THRESHOLDS = {
  ON_TIME: 10,
  LATE: 20,
} as const

export const calculateStatus = (
  checkInTime: Date,
  eventTime: Date
): AttendanceStatus => {
  const timeDifference = checkInTime.getTime() - eventTime.getTime()
  const minutesDifference = Math.floor(timeDifference / 60000)

  if (minutesDifference <= STATUS_THRESHOLDS.ON_TIME) {
    return AttendanceStatus.A_TIEMPO
  } else if (minutesDifference <= STATUS_THRESHOLDS.LATE) {
    return AttendanceStatus.TARDANZA
  }

  return AttendanceStatus.FALTA_INJUSTIFICADA
}
