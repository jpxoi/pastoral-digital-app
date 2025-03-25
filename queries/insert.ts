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
} from '@/db/schema'

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

export async function createUsers(data: InsertUser[]) {
  await db.insert(usersTable).values(data)
}

export async function createAttendanceRecord(data: InsertAttendance) {
  await db.insert(attendanceRecordsTable).values(data)
}

export async function createAttendanceRecords(data: InsertAttendance[]) {
  await db.insert(attendanceRecordsTable).values(data)
}

export async function createEvent(data: InsertEvent) {
  await db.insert(eventsTable).values(data)
}

export async function createEvents(data: InsertEvent[]) {
  await db.insert(eventsTable).values(data)
}

export async function createLocation(data: InsertLocation) {
  await db.insert(locationsTable).values(data)
}

export async function createLocations(data: InsertLocation[]) {
  await db.insert(locationsTable).values(data)
}
