import {
  boolean,
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
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  nickname: text('nickname'),
  email: text('email').notNull().unique(),
  phone_number: text('phone_number').notNull(),
  date_of_birth: timestamp('date_of_birth').notNull(),
  age: integer('age').notNull(),
  user_type: text('user_type').notNull().default('student'),
  student_code: text('student_code').unique(),
  has_confirmed: boolean('has_confirmed').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid('id').primaryKey(),
    user_id: text('user_id')
      .references(() => usersTable.id)
      .notNull(),
    event_id: integer('event_id')
      .references(() => eventsTable.id)
      .notNull(),
    check_in_time: timestamp('check_in_time').defaultNow(),
    status: text('status').default('present').notNull(),
    registered_by: text('registered_by')
      .references(() => usersTable.id)
      .notNull(),
  },
  (table) => {
    return {
      unq_user_event: uniqueIndex('unq_user_event').on(
        table.user_id,
        table.event_id
      ),
    }
  }
)

export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  location: text('location'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAttendance = typeof attendanceRecordsTable.$inferInsert
export type SelectAttendance = typeof attendanceRecordsTable.$inferSelect

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect
