import 'dotenv/config'
import { db } from '@/db/drizzle'
import { locationsTable, programsTable } from '@/db/schema'

const programs = [
  { code: 'COMMUNION', name: 'Comunión' },
  { code: 'CONFIRMATION', name: 'Confirmación' },
]

const locations = [
  {
    name: 'CEP Nuestra Señora del Perpetuo Socorro',
    address: 'Haendel 118',
    city: 'Trujillo',
    postalCode: '13001',
    country: 'Perú',
    googleMapsUrl: 'https://maps.app.goo.gl/PQdwa5F3WeYP39YR7',
  },
  {
    name: 'Complejo Deportivo CEP Nuestra Señora del Perpetuo Socorro',
    address: 'El Cortijo',
    city: 'Trujillo',
    postalCode: '13008',
    country: 'Perú',
    googleMapsUrl: 'https://maps.app.goo.gl/JDH2f2xwvYhp6s7U6',
  },
]

for (const program of programs) {
  await db
    .insert(programsTable)
    .values(program)
    .onConflictDoUpdate({
      target: programsTable.code,
      set: { name: program.name },
    })
}

for (const location of locations) {
  await db
    .insert(locationsTable)
    .values(location)
    .onConflictDoUpdate({
      target: locationsTable.name,
      set: {
        address: location.address,
        city: location.city,
        postalCode: location.postalCode,
        country: location.country,
        googleMapsUrl: location.googleMapsUrl,
      },
    })
}

console.info('Seed completado: programas y ubicaciones cargados.')
