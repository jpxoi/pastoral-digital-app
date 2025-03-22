import { AttendanceStatus } from '@/types'

export const calculateStatus = (
  checkInTime: Date,
  eventTime: Date
): AttendanceStatus => {
  const timeDifference = checkInTime.getTime() - eventTime.getTime()
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))

  if (minutesDifference < 0) {
    return AttendanceStatus.A_TIEMPO
  } else if (minutesDifference < 6) {
    return AttendanceStatus.TARDANZA
  } else if (minutesDifference < 16) {
    return AttendanceStatus.DOBLE_TARDANZA
  } else if (minutesDifference < 20) {
    return AttendanceStatus.FALTA_JUSTIFICADA
  } else if (isLateJustified) {
    return AttendanceStatus.TARDANZA_JUSTIFICADA
  } else if (isAbsentJustified) {
    return AttendanceStatus.FALTA_JUSTIFICADA
  } else {
    return AttendanceStatus.FALTA_INJUSTIFICADA
  }
}

const isLateJustified = false
const isAbsentJustified = false
