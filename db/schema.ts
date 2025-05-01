import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import {
  AttendanceRecordMethod,
  AttendanceStatus,
  UserCategory,
  UserRole,
  UserSchedule,
} from '@/types'
import { v7 as uuidv7 } from 'uuid'

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

export const userScheduleEnum = pgEnum('user_schedule_enum', [
  UserSchedule.FULL_TIME,
  UserSchedule.PRIMERA_COMUNION,
  UserSchedule.CONFIRMACION,
  UserSchedule.LOGISTICA,
  UserSchedule.SEMILLEROS,
  UserSchedule.COORDINADOR,
])

export const attendanceStatusEnum = pgEnum('attendance_status_enum', [
  AttendanceStatus.A_TIEMPO,
  AttendanceStatus.TARDANZA,
  AttendanceStatus.DOBLE_TARDANZA,
  AttendanceStatus.FALTA_JUSTIFICADA,
  AttendanceStatus.TARDANZA_JUSTIFICADA,
  AttendanceStatus.FALTA_INJUSTIFICADA,
])

export const AttendanceRecordMethodEnum = pgEnum(
  'attendance_record_method_enum',
  [
    AttendanceRecordMethod.MANUAL,
    AttendanceRecordMethod.QR,
    AttendanceRecordMethod.NFC,
  ]
)

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
  schedule: userScheduleEnum().default(UserSchedule.FULL_TIME).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    eventId: integer('event_id')
      .references(() => eventsTable.id, { onDelete: 'cascade' })
      .notNull(),
    checkInTime: timestamp('check_in_time').defaultNow().notNull(),
    status: attendanceStatusEnum().default(AttendanceStatus.A_TIEMPO).notNull(),
    registeredBy: text('registered_by')
      .references(() => usersTable.id)
      .notNull(),
    method: AttendanceRecordMethodEnum()
      .default(AttendanceRecordMethod.QR)
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('unq_user_event').on(table.userId, table.eventId),
    index('idx_attendance_records_user_id').on(table.userId),
    index('idx_attendance_records_event_id').on(table.eventId),
    index('idx_attendance_records_status').on(table.status),
  ]
)

export const eventsTable = pgTable(
  'events',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    description: text(),
    date: timestamp('date').notNull(),
    secondTurnDate: timestamp('second_turn_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    locationId: integer('location_id')
      .references(() => locationsTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index('idx_events_date').on(table.date)]
)

export const locationsTable = pgTable('locations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  address: text().notNull(),
  city: text().default('Trujillo').notNull(),
  postalCode: text('postal_code').notNull(),
  country: text('country').default('Perú').notNull(),
  googleMapsUrl: text('google_maps_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

/* Registro de Misas Dominicales */
export const sundayMassesTable = pgTable(
  'sunday_masses',
  {
    id: uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    parish: text().notNull(),
    sundayDate: date('sunday_date').notNull().defaultNow(),
    evidenceUrl: text('evidence_url').notNull(),
    evidenceMimeType: text('evidence_mime_type'),
    verified: boolean('verified').default(false).notNull(),
    verifiedBy: text('verified_by').references(() => usersTable.id),
    verifiedAt: timestamp('verified_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('unq_user_sunday_date').on(table.userId, table.sundayDate),
    index('idx_sunday_masses_user_id').on(table.userId),
    index('idx_sunday_masses_verified').on(table.verified),
  ]
)

/* Relations */

export const attendanceRecordsRelations = relations(
  attendanceRecordsTable,
  ({ one }) => {
    return {
      user: one(usersTable, {
        fields: [attendanceRecordsTable.userId],
        references: [usersTable.id],
        relationName: 'user',
      }),
      event: one(eventsTable, {
        fields: [attendanceRecordsTable.eventId],
        references: [eventsTable.id],
      }),
      registeredByUser: one(usersTable, {
        fields: [attendanceRecordsTable.registeredBy],
        references: [usersTable.id],
        relationName: 'registeredByUser',
      }),
    }
  }
)

export const usersRelations = relations(usersTable, ({ many }) => {
  return {
    attendanceRecords: many(attendanceRecordsTable, { relationName: 'user' }),
    attendanceRecordsRegisteredBy: many(attendanceRecordsTable, {
      relationName: 'registeredByUser',
    }),
    sundayMasses: many(sundayMassesTable, {
      relationName: 'user',
    }),
    sundayMassesVerifiedBy: many(sundayMassesTable, {
      relationName: 'verifier',
    }),
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

export const sundayMassesRelations = relations(sundayMassesTable, ({ one }) => {
  return {
    user: one(usersTable, {
      fields: [sundayMassesTable.userId],
      references: [usersTable.id],
      relationName: 'user',
    }),
    verifier: one(usersTable, {
      fields: [sundayMassesTable.verifiedBy],
      references: [usersTable.id],
      relationName: 'verifier',
    }),
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

export type InsertSundayMass = typeof sundayMassesTable.$inferInsert
export type SelectSundayMass = typeof sundayMassesTable.$inferSelect
