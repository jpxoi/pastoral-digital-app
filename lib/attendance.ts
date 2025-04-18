import { AttendanceStatus } from '@/types'

export const calculateStatus = (
  checkInTime: Date,
  eventTime: Date
): AttendanceStatus => {
  const timeDifference = checkInTime.getTime() - eventTime.getTime()
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))

  if (minutesDifference <= 15) {
    return AttendanceStatus.A_TIEMPO
  } else if (minutesDifference <= 20) {
    return AttendanceStatus.TARDANZA
  } else if (minutesDifference <= 30) {
    return AttendanceStatus.DOBLE_TARDANZA
  } else {
    return AttendanceStatus.FALTA_INJUSTIFICADA
  }
}
