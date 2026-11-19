'use server'

import { db } from '@/db/drizzle'
import { locationsTable } from '@/db/schema'
import { checkRole } from '@/lib/roles'
import { createEvent } from '@/queries/insert'
import { NewEventFormSchema } from '@/schema'
import { UserRole } from '@/types'
import { TZDate } from '@date-fns/tz'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { updateTag } from 'next/cache'

const EVENT_TIME_ZONE = 'America/Lima'

const toPeruDate = (value: string) => {
  const [date, time] = value.split('T')
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)

  return new TZDate(year, month - 1, day, hours, minutes, EVENT_TIME_ZONE)
}

export async function postNewEvent(formValues: unknown) {
  const { userId } = await auth()

  if (!userId) return { error: 'Inicia sesión para crear eventos.' }

  if (!(await checkRole(UserRole.ADMIN)))
    return { error: 'No estás autorizado para crear eventos.' }

  const validatedFields = NewEventFormSchema.safeParse(formValues)

  if (!validatedFields.success) {
    return { error: 'Revisa los campos del evento e inténtalo nuevamente.' }
  }

  const { name, description, firstTurnDate, secondTurnDate, endDate } =
    validatedFields.data
  const locationId = Number(validatedFields.data.locationId)

  if (!Number.isSafeInteger(locationId) || locationId < 1) {
    return { error: 'La ubicación seleccionada no es válida.' }
  }

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
      date: toPeruDate(firstTurnDate),
      secondTurnDate: toPeruDate(secondTurnDate || firstTurnDate),
      endDate: toPeruDate(endDate),
      locationId,
    })

    updateTag('events')
    return { success: 'El evento se creó correctamente.' }
  } catch (error) {
    console.error('Error creating event:', error)
    return { error: 'Ocurrió un error al crear el evento.' }
  }
}
