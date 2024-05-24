CREATE TABLE IF NOT EXISTS "post" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"avatar" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "users";