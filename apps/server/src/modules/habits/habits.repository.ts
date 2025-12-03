import { habits } from "@db/schema";
import { eq } from "drizzle-orm";
import type { HabitRepository } from "./habits.contracts";

export const HabitsRepositoryFn: HabitRepository = ({ db }) => {
  return {
    async create(values) {
      const [newHabit] = await db.insert(habits).values(values).returning();

      return newHabit;
    },

    async delete(id) {
      await db.delete(habits).where(eq(habits.id, id));
    },

    async findById(id) {
      return await db.query.habits.findFirst({
        where: eq(habits.id, id),
      });
    },

    async findByUserId(userId) {
      return await db.query.habits.findMany({
        where: eq(habits.userId, userId),
      });
    },

    async update(id, values) {
      const [updatedHabit] = await db
        .update(habits)
        .set(values)
        .where(eq(habits.id, id))
        .returning();

      return updatedHabit;
    },
  };
};
