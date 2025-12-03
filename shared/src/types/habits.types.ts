import type { habits } from "@db/schema";
import type { HabitsDto } from "@shared/dto";
import { z } from "zod";

export type Habit = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;
export type UpdateHabit = Partial<Habit>;

export type CreateHabitsDto = z.infer<typeof HabitsDto.create>;
export type UpdateHabitsDto = z.infer<typeof HabitsDto.update>;
