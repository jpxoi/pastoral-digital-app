'use server'

import { logger } from '@/lib/logger'
import { db } from '@/db/drizzle'
import { eventsTable, locationsTable } from '@/db/schema'
import { checkPermission } from '@/lib/roles'
import { createEvent } from '@/queries/insert'
import { NewEventFormSchema, UpdateEventFormSchema } from '@/schema'
import { Permission } from '@/types/permissions'
import { TZDate } from '@date-fns/tz'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { cacheTags } from '@/lib/cache'
import { updateTag } from 'next/cache'

const EVENT_TIME_ZONE = 'America/Lima'

const toPeruDate = (value: string) => {
  const [date, time] = value.split('T')
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)

  const peruDate = new TZDate(
    year,
    month - 1,
    day,
    hours,
    minutes,
    EVENT_TIME_ZONE
  )

  // Drizzle must serialize UTC, not TZDate's local ISO string with an offset.
  return new Date(peruDate.getTime())
}

export async function postNewEvent(formValues: unknown) {
  const { userId } = await auth()

  if (!userId) return { error: 'Inicia sesión para crear eventos.' }

  if (!(await checkPermission(Permission.EVENTS_CREATE)))
    return { error: 'No estás autorizado para crear eventos.' }

  const validatedFields = NewEventFormSchema.safeParse(formValues)

  if (!validatedFields.success) {
    return { error: 'Revisa los campos del evento e inténtalo nuevamente.' }
  }

  const {
    name,
    description,
    firstTurnDate,
    firstTurnTime,
    secondTurnDate,
    secondTurnTime,
    endDate,
    endTime,
  } = validatedFields.data
  const locationId = validatedFields.data.locationId

  try {
    const [location] = await db
      .select({ id: locationsTable.id })
      .from(locationsTable)
      .where(eq(locationsTable.id, locationId))
      .limit(1)

    if (!location) {
      return { error: 'La ubicación seleccionada ya no está disponible.' }
    }

    await createEvent({
      name,
      description: description || null,
      date: toPeruDate(`${firstTurnDate}T${firstTurnTime}`),
      secondTurnDate: toPeruDate(
        secondTurnDate && secondTurnTime
          ? `${secondTurnDate}T${secondTurnTime}`
          : `${firstTurnDate}T${firstTurnTime}`
      ),
      endDate: toPeruDate(`${endDate}T${endTime}`),
      locationId,
    })

    updateTag(cacheTags.eventsList())
    return { success: 'El evento se creó correctamente.' }
  } catch (error) {
    logger.error('Error creating event:', { error })
    return { error: 'Ocurrió un error al crear el evento.' }
  }
}

export async function updateEventDetails(values: unknown) {
  const { userId } = await auth()
  if (!userId || !(await checkPermission(Permission.EVENTS_EDIT))) {
    return { error: 'No estás autorizado para editar eventos.' }
  }
  const parsed = UpdateEventFormSchema.safeParse(values)
  if (!parsed.success) return { error: parsed.error.issues[0].message }

  try {
    const {
      id,
      name,
      description,
      firstTurnDate,
      firstTurnTime,
      secondTurnDate,
      secondTurnTime,
      endDate,
      endTime,
    } = parsed.data
    const updated = await db
      .update(eventsTable)
      .set({
        name,
        description: description || null,
        date: toPeruDate(`${firstTurnDate}T${firstTurnTime}`),
        secondTurnDate: toPeruDate(
          secondTurnDate && secondTurnTime
            ? `${secondTurnDate}T${secondTurnTime}`
            : `${firstTurnDate}T${firstTurnTime}`
        ),
        endDate: toPeruDate(`${endDate}T${endTime}`),
      })
      .where(eq(eventsTable.id, id))
      .returning({ id: eventsTable.id })
    if (!updated.length) return { error: 'El evento ya no está disponible.' }
    updateTag(cacheTags.eventsList())
    updateTag(cacheTags.event(id))
    return { success: 'Evento actualizado correctamente.' }
  } catch (error) {
    logger.error('Error updating event:', { error })
    return { error: 'No se pudo actualizar el evento.' }
  }
}
