'use server'

import { getTodayEvent } from '@/queries/select'

export const getEventOfTheDay = async (): Promise<{
  success?: string
  event?: any
  error?: string
}> => {
  return await getTodayEvent()
    .then((event) => {
      if (!event) {
        return {
          error: 'No hay ningún evento programado para hoy.',
        }
      }

      return {
        success: 'Evento del día obtenido correctamente.',
        event: event,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        error: 'Ha ocurrido un error al obtener el evento del día.',
      }
    })
}
