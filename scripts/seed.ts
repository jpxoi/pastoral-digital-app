import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está configurada.')
}

const sql = neon(process.env.DATABASE_URL)

const programs = [
  { code: 'COMMUNION', name: 'Comunión' },
  { code: 'CONFIRMATION', name: 'Confirmación' },
]

const locations = [
  {
    name: 'CEP Nuestra Señora del Perpetuo Socorro',
    address: 'Calle Haendel 118, Urb. Primavera',
    city: 'Trujillo',
    postalCode: '13001',
    country: 'Perú',
    googleMapsUrl: 'https://maps.app.goo.gl/PQdwa5F3WeYP39YR7',
  },
  {
    name: 'Complejo Deportivo CEP Nuestra Señora del Perpetuo Socorro',
    address: 'Calle Mario Vargas Llosa s/n, El Cortijo',
    city: 'Trujillo',
    postalCode: '13008',
    country: 'Perú',
    googleMapsUrl: 'https://maps.app.goo.gl/JDH2f2xwvYhp6s7U6',
  },
]

for (const program of programs) {
  await sql`
    INSERT INTO programs (code, name)
    VALUES (${program.code}, ${program.name})
    ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
  `
}

for (const location of locations) {
  const [existingLocation] = await sql`
    SELECT id
    FROM locations
    WHERE name = ${location.name}
    ORDER BY id
    LIMIT 1
  `

  if (existingLocation) {
    await sql`
      UPDATE locations
      SET address = ${location.address},
          city = ${location.city},
          postal_code = ${location.postalCode},
          country = ${location.country},
          google_maps_url = ${location.googleMapsUrl},
          updated_at = now()
      WHERE id = ${existingLocation.id}
    `
  } else {
    await sql`
      INSERT INTO locations (
        name,
        address,
        city,
        postal_code,
        country,
        google_maps_url
      )
      VALUES (
        ${location.name},
        ${location.address},
        ${location.city},
        ${location.postalCode},
        ${location.country},
        ${location.googleMapsUrl}
      )
    `
  }
}

console.info('Seed completado: programas y ubicaciones cargados.')
