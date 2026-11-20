CREATE TYPE "public"."attendance_record_method_enum" AS ENUM('manual', 'qr', 'nfc');--> statement-breakpoint
CREATE TYPE "public"."attendance_status_enum" AS ENUM('A TIEMPO', 'TARDANZA', 'FALTA JUSTIFICADA', 'TARDANZA JUSTIFICADA', 'FALTA INJUSTIFICADA');--> statement-breakpoint
CREATE TYPE "public"."catechist_assignment_type_enum" AS ENUM('PROGRAM', 'COORDINATOR', 'LOGISTICS');--> statement-breakpoint
CREATE TYPE "public"."community_responsibility_enum" AS ENUM('GUIDE', 'ADVISOR', 'SEMILLERO');--> statement-breakpoint
CREATE TYPE "public"."mass_evidence_state" AS ENUM('available', 'attached', 'deleting', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."sunday_mass_status_enum" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."user_category_enum" AS ENUM('student', 'alumni', 'teacher');--> statement-breakpoint
CREATE TYPE "public"."user_schedule_enum" AS ENUM('full-time', 'primera-comunion', 'confirmacion', 'logistica', 'semilleros', 'coordinador');--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"user_id" text NOT NULL,
	"event_id" uuid NOT NULL,
	"check_in_time" timestamp DEFAULT now() NOT NULL,
	"status" "attendance_status_enum" DEFAULT 'A TIEMPO' NOT NULL,
	"registered_by" text NOT NULL,
	"method" "attendance_record_method_enum" DEFAULT 'qr' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "catechist_assignments" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"user_id" text NOT NULL,
	"type" "catechist_assignment_type_enum" NOT NULL,
	"program_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "chk_catechist_assignments_program_type" CHECK (("catechist_assignments"."type" = 'PROGRAM' AND "catechist_assignments"."program_id" IS NOT NULL) OR ("catechist_assignments"."type" IN ('COORDINATOR', 'LOGISTICS') AND "catechist_assignments"."program_id" IS NULL))
);
--> statement-breakpoint
CREATE TABLE "catechist_community_assignments" (
	"assignment_id" uuid PRIMARY KEY NOT NULL,
	"community_id" uuid NOT NULL,
	"responsibility" "community_responsibility_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "communities" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"program_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"second_turn_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"location_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text DEFAULT 'Trujillo' NOT NULL,
	"postal_code" text NOT NULL,
	"country" text DEFAULT 'Perú' NOT NULL,
	"google_maps_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mass_evidence_files" (
	"key" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"hash" text NOT NULL,
	"state" "mass_evidence_state" DEFAULT 'available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "programs_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "sunday_masses" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"user_id" text NOT NULL,
	"parish" text NOT NULL,
	"sunday_date" date DEFAULT now() NOT NULL,
	"evidence_file_key" text NOT NULL,
	"evidence_file_hash" text NOT NULL,
	"status" "sunday_mass_status_enum" DEFAULT 'pending' NOT NULL,
	"verified_by" text,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sunday_masses_evidence_file_key_unique" UNIQUE("evidence_file_key"),
	CONSTRAINT "sunday_masses_evidence_file_hash_unique" UNIQUE("evidence_file_hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"dni" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"category" "user_category_enum" NOT NULL,
	"student_code" text,
	"role" text DEFAULT 'member' NOT NULL,
	"schedule" "user_schedule_enum" DEFAULT 'full-time' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_registered_by_users_id_fk" FOREIGN KEY ("registered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catechist_assignments" ADD CONSTRAINT "catechist_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catechist_assignments" ADD CONSTRAINT "catechist_assignments_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catechist_community_assignments" ADD CONSTRAINT "catechist_community_assignments_assignment_id_catechist_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."catechist_assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catechist_community_assignments" ADD CONSTRAINT "catechist_community_assignments_community_id_communities_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."communities"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "communities" ADD CONSTRAINT "communities_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_event" ON "attendance_records" USING btree ("user_id","event_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_user_id" ON "attendance_records" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_event_id" ON "attendance_records" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_status" ON "attendance_records" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_catechist_assignments_user_program" ON "catechist_assignments" USING btree ("user_id","program_id") WHERE "catechist_assignments"."type" = 'PROGRAM';--> statement-breakpoint
CREATE UNIQUE INDEX "unq_catechist_assignments_user_service" ON "catechist_assignments" USING btree ("user_id","type") WHERE "catechist_assignments"."type" IN ('COORDINATOR', 'LOGISTICS');--> statement-breakpoint
CREATE UNIQUE INDEX "unq_communities_program_id_name" ON "communities" USING btree ("program_id","name");--> statement-breakpoint
CREATE INDEX "idx_events_date" ON "events" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_sunday_date" ON "sunday_masses" USING btree ("user_id","sunday_date");--> statement-breakpoint
CREATE INDEX "idx_sunday_masses_user_id" ON "sunday_masses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_sunday_masses_status" ON "sunday_masses" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_users_dni" ON "users" USING btree ("dni") WHERE "users"."dni" IS NOT NULL;