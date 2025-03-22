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

export const userCategoryEnum = pgEnum('user_category_enum', [
  UserCategory.STUDENT,
  UserCategory.ALUMNI,
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

export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  nickname: text('nickname'),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  category: userCategoryEnum().notNull(),
  studentCode: text('student_code'),
  role: userRoleEnum().notNull().default(UserRole.MEMBER),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .references(() => usersTable.id)
      .notNull(),
    eventId: integer('event_id')
      .references(() => eventsTable.id)
      .notNull(),
    checkInTime: timestamp('check_in_time').defaultNow(),
    status: attendanceStatusEnum().notNull().default(AttendanceStatus.A_TIEMPO),
    registeredBy: text('registered_by')
      .references(() => usersTable.id)
      .notNull(),
    method: text('method').default('QR').notNull(),
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
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  locationId: serial('location_id')
    .references(() => locationsTable.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const locationsTable = pgTable('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  capacity: integer('capacity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const attendanceRecordsRelations = relations(
  attendanceRecordsTable,
  ({ one }) => {
    return {
      user: one(usersTable, {
        fields: [attendanceRecordsTable.userId],
        references: [usersTable.id],
      }),
      registeredBy: one(usersTable, {
        fields: [attendanceRecordsTable.registeredBy],
        references: [usersTable.id],
      }),
    }
  }
)

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAttendance = typeof attendanceRecordsTable.$inferInsert
export type SelectAttendance = typeof attendanceRecordsTable.$inferSelect

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect

export type InsertLocation = typeof locationsTable.$inferInsert
export type SelectLocation = typeof locationsTable.$inferSelect
