import { getPeruDateKey } from '@/lib/birthday'

export type PushMessage = {
  title: string
  body: string
  url: string
  tag: string
}

export const PUSH_TIME_ZONE = 'America/Lima'

export function getNextPeruDateKey(now: Date) {
  // Lima has no daylight saving changes.
  return getPeruDateKey(new Date(now.getTime() + 86_400_000))
}

export function eventReminder(event: {
  id: string
  name: string
  date: Date
  location: string
}): PushMessage {
  const time = new Intl.DateTimeFormat('es-PE', {
    timeZone: PUSH_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(event.date)
  return {
    title: `Mañana: ${event.name}`,
    body: `Te esperamos a las ${time} en ${event.location}.`,
    url: `/events#event-${event.id}`,
    tag: `event:${event.id}:${getPeruDateKey(event.date)}`,
  }
}

export function massReviewMessage(
  id: string,
  sundayDate: string,
  accepted: boolean
): PushMessage {
  const date = new Intl.DateTimeFormat('es-PE', {
    timeZone: PUSH_TIME_ZONE,
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${sundayDate}T12:00:00-05:00`))
  return {
    title: `Tu registro de misa fue ${accepted ? 'aprobado' : 'rechazado'}`,
    body: accepted
      ? `Se aprobó tu evidencia del domingo ${date}.`
      : `La evidencia del domingo ${date} no fue aprobada. Consulta el estado en Mis misas.`,
    url: '/masses',
    tag: `mass:${id}:${accepted ? 'accepted' : 'rejected'}`,
  }
}

export function attendanceUpdatedMessage(id: string): PushMessage {
  return {
    title: 'Tu asistencia fue actualizada',
    body: 'Hay una actualización en tu registro. Consulta los detalles en tu historial de asistencias.',
    url: '/attendance',
    tag: `attendance:${id}`,
  }
}

export function birthdayGreeting(firstName: string, date: string): PushMessage {
  return {
    title: `¡Feliz cumpleaños, ${firstName}! 🎉`,
    body: 'Que María te acompañe en este nuevo año de vida. ¡Un abrazo de tu familia pastoral!',
    url: '/birthdays',
    tag: `birthday-greeting:${date}`,
  }
}

export function birthdayAnnouncement(
  people: { firstName: string; lastName: string }[],
  date: string
): PushMessage {
  const names = new Intl.ListFormat('es-PE', { type: 'conjunction' }).format(
    people.map((person) => `${person.firstName} ${person.lastName}`)
  )
  return {
    title: '¡Hoy celebramos cumpleaños! 🎂',
    body: `Hoy es el cumpleaños de ${names}. ¡Acompáñalos con un saludo!`,
    url: '/birthdays',
    tag: `birthday-announcement:${date}`,
  }
}

export function birthdayMessagesForUser(
  user: { id: string; firstName: string },
  birthdays: { id: string; firstName: string; lastName: string }[],
  date: string
): PushMessage[] {
  const others = birthdays.filter((person) => person.id !== user.id)
  return [
    ...(birthdays.some((person) => person.id === user.id)
      ? [birthdayGreeting(user.firstName, date)]
      : []),
    ...(others.length ? [birthdayAnnouncement(others, date)] : []),
  ]
}
