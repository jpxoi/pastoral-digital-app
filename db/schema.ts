import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { AttendanceStatus, UserCategory, UserRole } from '@/types'

/* Enums */

export const userCategoryEnum = pgEnum('user_category_enum', [
  UserCategory.STUDENT,
  UserCategory.ALUMNI,
  UserCategory.TEACHER,
])

export const userRoleEnum = pgEnum('user_role_enum', [
  UserRole.MEMBER,
  UserRole.ADMIN,
])

export const attendanceStatusEnum = pgEnum('attendance_status_enum', [
  AttendanceStatus.A_TIEMPO,
  AttendanceStatus.TARDANZA,
  AttendanceStatus.DOBLE_TARDANZA,
  AttendanceStatus.FALTA_JUSTIFICADA,
  AttendanceStatus.TARDANZA_JUSTIFICADA,
  AttendanceStatus.FALTA_INJUSTIFICADA,
])

/* Tables */

export const usersTable = pgTable('users', {
  id: text().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  nickname: text(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  phoneNumber: text('phone_number').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  category: userCategoryEnum().notNull(),
  studentCode: text('student_code'),
  role: userRoleEnum().default(UserRole.MEMBER).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: text('user_id')
      .references(() => usersTable.id)
      .notNull(),
    eventId: integer('event_id')
      .references(() => eventsTable.id)
      .notNull(),
    checkInTime: timestamp('check_in_time').defaultNow(),
    status: attendanceStatusEnum().default(AttendanceStatus.A_TIEMPO).notNull(),
    registeredBy: text('registered_by')
      .references(() => usersTable.id)
      .notNull(),
    method: text().default('QR').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      unq_user_event: uniqueIndex('unq_user_event').on(
        table.userId,
        table.eventId
      ),
    }
  }
)

export const eventsTable = pgTable('events', {
  id: serial().primaryKey(),
  name: text().notNull(),
  description: text(),
  date: timestamp().notNull(),
  locationId: serial('location_id')
    .references(() => locationsTable.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const locationsTable = pgTable('locations', {
  id: serial().primaryKey(),
  name: text().notNull(),
  address: text().notNull(),
  city: text().default('Trujillo').notNull(),
  postalCode: text('postal_code').notNull(),
  country: text('country').default('Perú').notNull(),
  googleMapsUrl: text('google_maps_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

/* Relations */

export const attendanceRecordsRelations = relations(
  attendanceRecordsTable,
  ({ one }) => {
    return {
      user: one(usersTable, {
        fields: [attendanceRecordsTable.userId],
        references: [usersTable.id],
      }),
      event: one(eventsTable, {
        fields: [attendanceRecordsTable.eventId],
        references: [eventsTable.id],
      }),
      registeredBy: one(usersTable, {
        fields: [attendanceRecordsTable.registeredBy],
        references: [usersTable.id],
      }),
    }
  }
)

export const usersRelations = relations(usersTable, ({ many }) => {
  return {
    attendanceRecords: many(attendanceRecordsTable),
    attendanceRecordsRegisteredBy: many(attendanceRecordsTable),
  }
})

export const eventsRelations = relations(eventsTable, ({ one, many }) => {
  return {
    attendanceRecords: many(attendanceRecordsTable),
    location: one(locationsTable, {
      fields: [eventsTable.locationId],
      references: [locationsTable.id],
    }),
  }
})

export const locationsRelations = relations(locationsTable, ({ many }) => {
  return {
    events: many(eventsTable),
  }
})

/* Types */

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAttendance = typeof attendanceRecordsTable.$inferInsert
export type SelectAttendance = typeof attendanceRecordsTable.$inferSelect

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect

export type InsertLocation = typeof locationsTable.$inferInsert
export type SelectLocation = typeof locationsTable.$inferSelect
