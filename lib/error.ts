import { NeonDbError } from '@neondatabase/serverless'

export const handleDbError = (error: NeonDbError) => {
  if (error.message.includes('unq_user_event')) {
    return 'Este catequista ya tiene asistencia registrada para el evento actual. No se permiten registros duplicados.'
  } else if (error.message.includes('attendance_records_user_id_users_id_fk')) {
    return 'No se encontró al catequista en la base de datos. Por favor, verifica que esté registrado correctamente.'
  } else if (
    error.message.includes('attendance_records_event_id_events_id_fk')
  ) {
    return 'No se encontró el evento en la base de datos. Por favor, verifica que haya un evento programado para hoy.'
  } else if (
    error.message.includes('attendance_records_registered_by_users_id_fk')
  ) {
    return 'Tu usuario no tiene permisos para registrar asistencias. Por favor, contacta al administrador.'
  } else {
    return 'Ocurrió un error inesperado al registrar la asistencia. Por favor, inténtalo nuevamente.'
  }
}
