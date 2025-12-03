import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: serial().primaryKey(),

  refreshToken: text().notNull(),

  userId: integer().notNull(),

  expiresAt: timestamp().notNull(),

  revokedAt: timestamp(),

  createdAt: timestamp().defaultNow().notNull(),

  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
