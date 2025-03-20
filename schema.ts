import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  nickname: text('nickname'),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  category: text('category').notNull().default('student'),
  studentCode: text('student_code').unique(),
  role: text('role').notNull().default('member'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
},
(table) => {
  return {
    unq_student_code: uniqueIndex('unq_student_code').on(table.studentCode),
  }
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
    status: text('status').default('A TIEMPO').notNull(),
    registeredBy: text('registered_by')
      .references(() => usersTable.id)
      .notNull(),
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

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAttendance = typeof attendanceRecordsTable.$inferInsert
export type SelectAttendance = typeof attendanceRecordsTable.$inferSelect

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect

export type InsertLocation = typeof locationsTable.$inferInsert
export type SelectLocation = typeof locationsTable.$inferSelect
