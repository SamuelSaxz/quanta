import type { sessions } from "@db/schema/sessions.sql";

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;
export type UpdateSession = Partial<InsertSession>;
