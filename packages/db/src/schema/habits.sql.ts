import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users.sql";

export const habitsFrequencies = pgEnum("habit_frequencies", [
  "one_day",
  "some_days",
  "all_days",
]);

export const habitsTimes = pgEnum("habit_times", [
  "morning",
  "afternoon",
  "evening",
  "any_time",
]);

export const habitsTypes = pgEnum("habit_types", ["check", "repeat"]);

export const habits = pgTable("habits", {
  id: serial().primaryKey(),

  userId: integer()
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  name: text().notNull(),

  type: habitsTypes().notNull(),

  repeatTarget: integer(),

  frequency: habitsFrequencies().notNull(),

  frequencyDays: text().array().notNull(), // 0 = Sunday, 1 = Monday, etc.

  preferredTime: habitsTimes().notNull(),

  reminderEnabled: boolean().notNull(),

  motivation: text().notNull(),

  createdAt: timestamp().defaultNow().notNull(),

  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
