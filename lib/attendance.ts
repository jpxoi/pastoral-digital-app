export const calculateStatus = (checkInTime: Date, eventTime: Date) => {
  const timeDifference = checkInTime.getTime() - eventTime.getTime()
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))

  if (minutesDifference < 0) {
    return 'A TIEMPO'
  } else if (minutesDifference < 6) {
    return 'A TIEMPO'
  } else if (minutesDifference < 16) {
    return 'TARDANZA'
  } else if (minutesDifference < 20) {
    return 'DOBLE TARDANZA'
  } else {
    return 'AUSENTE'
  }
}
