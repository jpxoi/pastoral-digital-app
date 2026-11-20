import {
  date,
  check,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import {
  AttendanceRecordMethod,
  AttendanceStatus,
  SundayMassStatus,
  UserCategory,
  UserRole,
  UserSchedule,
} from '@/types'

/* Enums */

export const userCategoryEnum = pgEnum('user_category_enum', [
  UserCategory.STUDENT,
  UserCategory.ALUMNI,
  UserCategory.TEACHER,
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

export const sundayMassStatusEnum = pgEnum('sunday_mass_status_enum', [
  SundayMassStatus.PENDING,
  SundayMassStatus.ACCEPTED,
  SundayMassStatus.REJECTED,
])

export const catechistAssignmentTypeEnum = pgEnum(
  'catechist_assignment_type_enum',
  ['PROGRAM', 'COORDINATOR', 'LOGISTICS']
)

export const communityResponsibilityEnum = pgEnum(
  'community_responsibility_enum',
  ['GUIDE', 'ADVISOR', 'SEMILLERO']
)

/* Tables */

export const usersTable = pgTable(
  'users',
  {
    id: text().primaryKey(),
    dni: text(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text().notNull().unique(),
    phoneNumber: text('phone_number').notNull(),
    dateOfBirth: date('date_of_birth').notNull(),
    category: userCategoryEnum().notNull(),
    studentCode: text('student_code'),
    role: text('role', {
      enum: [
        UserRole.MEMBER,
        UserRole.ADMIN,
        UserRole.SCANNER,
        UserRole.TEACHER,
        UserRole.COORDINATOR,
        UserRole.MANAGER,
      ],
    })
      .default(UserRole.MEMBER)
      .notNull(),
    schedule: userScheduleEnum().default(UserSchedule.FULL_TIME).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('unq_users_dni')
      .on(table.dni)
      .where(sql`${table.dni} IS NOT NULL`),
  ]
)

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    eventId: uuid('event_id')
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
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    name: text().notNull(),
    description: text(),
    date: timestamp('date').notNull(),
    secondTurnDate: timestamp('second_turn_date').notNull(),
    endDate: timestamp('end_date').notNull(),
    locationId: uuid('location_id')
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
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
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

export const programsTable = pgTable('programs', {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  code: text().notNull().unique(),
  name: text().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const communitiesTable = pgTable(
  'communities',
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    programId: uuid('program_id')
      .references(() => programsTable.id)
      .notNull(),
    name: text().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex('unq_communities_program_id_name').on(
      table.programId,
      table.name
    ),
  ]
)

export const catechistAssignmentsTable = pgTable(
  'catechist_assignments',
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    type: catechistAssignmentTypeEnum().notNull(),
    programId: uuid('program_id').references(() => programsTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    check(
      'chk_catechist_assignments_program_type',
      sql`(${table.type} = 'PROGRAM' AND ${table.programId} IS NOT NULL) OR (${table.type} IN ('COORDINATOR', 'LOGISTICS') AND ${table.programId} IS NULL)`
    ),
    uniqueIndex('unq_catechist_assignments_user_program')
      .on(table.userId, table.programId)
      .where(sql`${table.type} = 'PROGRAM'`),
    uniqueIndex('unq_catechist_assignments_user_service')
      .on(table.userId, table.type)
      .where(sql`${table.type} IN ('COORDINATOR', 'LOGISTICS')`),
  ]
)

export const catechistCommunityAssignmentsTable = pgTable(
  'catechist_community_assignments',
  {
    assignmentId: uuid('assignment_id')
      .primaryKey()
      .references(() => catechistAssignmentsTable.id, { onDelete: 'cascade' }),
    communityId: uuid('community_id')
      .references(() => communitiesTable.id, { onDelete: 'restrict' })
      .notNull(),
    responsibility: communityResponsibilityEnum().notNull(),
  }
)

export const massEvidenceStateEnum = pgEnum('mass_evidence_state', [
  'available',
  'attached',
  'deleting',
  'deleted',
])

export const massEvidenceFilesTable = pgTable('mass_evidence_files', {
  key: text('key').primaryKey(),
  userId: text('user_id').notNull(),
  hash: text('hash').notNull(),
  state: massEvidenceStateEnum('state').notNull().default('available'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

/* Registro de Misas Dominicales */
export const sundayMassesTable = pgTable(
  'sunday_masses',
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    parish: text().notNull(),
    sundayDate: date('sunday_date').notNull().defaultNow(),
    evidenceFileKey: text('evidence_file_key').notNull().unique(),
    evidenceFileHash: text('evidence_file_hash').notNull().unique(),
    status: sundayMassStatusEnum('status')
      .default(SundayMassStatus.PENDING)
      .notNull(),
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
    index('idx_sunday_masses_status').on(table.status),
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
    catechistAssignments: many(catechistAssignmentsTable),
  }
})

export const programsRelations = relations(programsTable, ({ many }) => ({
  communities: many(communitiesTable),
  catechistAssignments: many(catechistAssignmentsTable),
}))

export const communitiesRelations = relations(
  communitiesTable,
  ({ one, many }) => ({
    program: one(programsTable, {
      fields: [communitiesTable.programId],
      references: [programsTable.id],
    }),
    catechistAssignments: many(catechistCommunityAssignmentsTable),
  })
)

export const catechistAssignmentsRelations = relations(
  catechistAssignmentsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [catechistAssignmentsTable.userId],
      references: [usersTable.id],
    }),
    program: one(programsTable, {
      fields: [catechistAssignmentsTable.programId],
      references: [programsTable.id],
    }),
    communityAssignment: one(catechistCommunityAssignmentsTable),
  })
)

export const catechistCommunityAssignmentsRelations = relations(
  catechistCommunityAssignmentsTable,
  ({ one }) => ({
    assignment: one(catechistAssignmentsTable, {
      fields: [catechistCommunityAssignmentsTable.assignmentId],
      references: [catechistAssignmentsTable.id],
    }),
    community: one(communitiesTable, {
      fields: [catechistCommunityAssignmentsTable.communityId],
      references: [communitiesTable.id],
    }),
  })
)

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

export type InsertProgram = typeof programsTable.$inferInsert
export type SelectProgram = typeof programsTable.$inferSelect

export type InsertCommunity = typeof communitiesTable.$inferInsert
export type SelectCommunity = typeof communitiesTable.$inferSelect

export type InsertCatechistAssignment =
  typeof catechistAssignmentsTable.$inferInsert
export type SelectCatechistAssignment =
  typeof catechistAssignmentsTable.$inferSelect

export type InsertCatechistCommunityAssignment =
  typeof catechistCommunityAssignmentsTable.$inferInsert
export type SelectCatechistCommunityAssignment =
  typeof catechistCommunityAssignmentsTable.$inferSelect
