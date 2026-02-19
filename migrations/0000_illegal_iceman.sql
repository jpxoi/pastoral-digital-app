CREATE TYPE "public"."attendance_record_method_enum" AS ENUM('manual', 'qr', 'nfc');--> statement-breakpoint
CREATE TYPE "public"."attendance_status_enum" AS ENUM('A TIEMPO', 'TARDANZA', 'DOBLE TARDANZA', 'FALTA JUSTIFICADA', 'TARDANZA JUSTIFICADA', 'FALTA INJUSTIFICADA');--> statement-breakpoint
CREATE TYPE "public"."user_category_enum" AS ENUM('student', 'alumni', 'teacher');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('member', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_schedule_enum" AS ENUM('full-time', 'primera-comunion', 'confirmacion', 'logistica', 'semilleros', 'coordinador');--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"event_id" integer NOT NULL,
	"check_in_time" timestamp DEFAULT now() NOT NULL,
	"status" "attendance_status_enum" DEFAULT 'A TIEMPO' NOT NULL,
	"registered_by" text NOT NULL,
	"method" "attendance_record_method_enum" DEFAULT 'qr' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"second_turn_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"location_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "locations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
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
CREATE TABLE "sunday_masses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"parish" text NOT NULL,
	"sunday_date" date DEFAULT now() NOT NULL,
	"evidence_url" text NOT NULL,
	"evidence_mime_type" text,
	"verified" boolean DEFAULT false NOT NULL,
	"verified_by" text,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"nickname" text,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"category" "user_category_enum" NOT NULL,
	"student_code" text,
	"role" "user_role_enum" DEFAULT 'member' NOT NULL,
	"schedule" "user_schedule_enum" DEFAULT 'full-time' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_registered_by_users_id_fk" FOREIGN KEY ("registered_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_event" ON "attendance_records" USING btree ("user_id","event_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_user_id" ON "attendance_records" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_event_id" ON "attendance_records" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "idx_attendance_records_status" ON "attendance_records" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_events_date" ON "events" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "unq_user_sunday_date" ON "sunday_masses" USING btree ("user_id","sunday_date");--> statement-breakpoint
CREATE INDEX "idx_sunday_masses_user_id" ON "sunday_masses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_sunday_masses_verified" ON "sunday_masses" USING btree ("verified");