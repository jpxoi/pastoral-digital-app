import { sql } from 'drizzle-orm'
import { db } from '@/db/drizzle'
import {
  InsertUser,
  InsertAttendance,
  InsertEvent,
  InsertLocation,
  usersTable,
  attendanceRecordsTable,
  eventsTable,
  locationsTable,
  InsertSundayMass,
  sundayMassesTable,
} from '@/db/schema'

export const createUser = async (data: InsertUser) => {
  const [user] = await db
    .insert(usersTable)
    .values(data)
    .onConflictDoUpdate({
      target: usersTable.id,
      set: {
        dni: data.dni,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        category: data.category,
        studentCode: data.studentCode,
      },
    })
    .returning({ role: usersTable.role })
  return user
}

export const createUsers = async (data: InsertUser[]) => {
  await db.insert(usersTable).values(data)
}

export const createAttendanceRecord = async (data: InsertAttendance) => {
  await db.insert(attendanceRecordsTable).values(data)
}

export const createAttendanceRecords = async (data: InsertAttendance[]) => {
  await db.insert(attendanceRecordsTable).values(data)
}

export const createEvent = async (data: InsertEvent) => {
  await db.insert(eventsTable).values(data)
}

export const createEvents = async (data: InsertEvent[]) => {
  await db.insert(eventsTable).values(data)
}

export const createLocation = async (data: InsertLocation) => {
  await db.insert(locationsTable).values(data)
}

export const createLocations = async (data: InsertLocation[]) => {
  await db.insert(locationsTable).values(data)
}

export const createSundayMass = async (
  data: Omit<InsertSundayMass, 'evidenceFileHash'>
) => {
  // Claim and insertion share one statement: any constraint failure rolls both back.
  const result = await db.execute(sql`
    WITH evidence AS (
      UPDATE mass_evidence_files SET state = 'attached', updated_at = now()
      WHERE key = ${data.evidenceFileKey} AND user_id = ${data.userId} AND state = 'available'
        AND now() >= (${data.sundayDate}::date AT TIME ZONE 'America/Lima')
        AND now() < ((${data.sundayDate}::date + interval '1 day 12 hours') AT TIME ZONE 'America/Lima')
        AND NOT EXISTS (SELECT 1 FROM sunday_masses WHERE evidence_file_key = ${data.evidenceFileKey})
      RETURNING key, hash
    )
    INSERT INTO sunday_masses (user_id, parish, sunday_date, evidence_file_key, evidence_file_hash)
    SELECT ${data.userId}, ${data.parish}, ${data.sundayDate}, key, hash FROM evidence
    RETURNING id
  `)
  if (!result.rows.length) throw new Error('EVIDENCE_UNAVAILABLE')
}
export const createSundayMasses = async (data: InsertSundayMass[]) => {
  await db.insert(sundayMassesTable).values(data)
}
