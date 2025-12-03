import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.sql";

export const onboarding = pgTable("onboarding", {
  id: serial().primaryKey(),

  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),

  questionOne: integer().notNull(),

  questionTwo: integer().notNull(),

  questionThree: integer().notNull(),

  questionFour: integer().notNull(),

  questionFive: integer().notNull(),

  questionSix: integer().notNull(),

  createdAt: timestamp().defaultNow().notNull(),

  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
