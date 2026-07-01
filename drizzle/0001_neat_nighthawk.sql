CREATE TABLE "lead_visits" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer NOT NULL,
	"visit_date" timestamp DEFAULT now() NOT NULL,
	"contact_name" varchar(200),
	"contact_phone" varchar(100),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"traffic_light" varchar(10),
	"demo_shown" boolean,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lead_visits" ADD CONSTRAINT "lead_visits_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;