import { NeonDbError } from "@neondatabase/serverless"

export const handleDbError = (error: NeonDbError) => {
  if (error.message.includes('unq_user_event')) {
    return 'El catequista ya ha sido registrado en este evento.'
  } else if (error.message.includes('attendance_records_user_id_users_id_fk')) {
    return 'El catequista no existe en la base de datos.'
  } else if (
    error.message.includes('attendance_records_event_id_events_id_fk')
  ) {
    return 'El evento no existe en la base de datos.'
  } else if (
    error.message.includes('attendance_records_registered_by_users_id_fk')
  ) {
    return 'El usuario que registra no existe en la base de datos.'
  } else {
    return 'Ha ocurrido un error al registrar la asistencia.'
  }
}
