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
  await db.insert(usersTable).values(data)
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

export const createSundayMass = async (data: InsertSundayMass) => {
  await db.insert(sundayMassesTable).values(data)
}
export const createSundayMasses = async (data: InsertSundayMass[]) => {
  await db.insert(sundayMassesTable).values(data)
}
