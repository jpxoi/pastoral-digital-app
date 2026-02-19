ALTER TABLE "sunday_masses" RENAME COLUMN "evidence_url" TO "evidence_file_key";--> statement-breakpoint
ALTER TABLE "sunday_masses" RENAME COLUMN "evidence_mime_type" TO "evidence_file_hash";--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_evidence_file_key_unique" UNIQUE("evidence_file_key");--> statement-breakpoint
ALTER TABLE "sunday_masses" ADD CONSTRAINT "sunday_masses_evidence_file_hash_unique" UNIQUE("evidence_file_hash");