CREATE TYPE "public"."habit_frequencies" AS ENUM('one_day', 'some_days', 'all_days');--> statement-breakpoint
CREATE TYPE "public"."habit_times" AS ENUM('morning', 'afternoon', 'evening', 'any_time');--> statement-breakpoint
CREATE TYPE "public"."habit_types" AS ENUM('check', 'repeat');--> statement-breakpoint
CREATE TABLE "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" "habit_types" NOT NULL,
	"repeat_target" integer,
	"frequency" "habit_frequencies" NOT NULL,
	"frequency_days" text[] NOT NULL,
	"preferred_time" "habit_times" NOT NULL,
	"reminder_enabled" boolean NOT NULL,
	"motivation" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"question_one" integer NOT NULL,
	"question_two" integer NOT NULL,
	"question_three" integer NOT NULL,
	"question_four" integer NOT NULL,
	"question_five" integer NOT NULL,
	"question_six" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;