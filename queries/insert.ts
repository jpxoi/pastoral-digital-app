'use server'

import { db } from '@/db'
import {
  InsertUser,
  InsertAttendance,
  InsertEvent,
  InsertLocation,
  usersTable,
  attendanceRecordsTable,
  eventsTable,
  locationsTable,
} from '@/schema'

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

export async function createAttendanceRecord(data: InsertAttendance) {
  await db.insert(attendanceRecordsTable).values(data)
}

export async function createEvent(data: InsertEvent) {
  await db.insert(eventsTable).values(data)
}

export async function createLocation(data: InsertLocation) {
  await db.insert(locationsTable).values(data)
}
