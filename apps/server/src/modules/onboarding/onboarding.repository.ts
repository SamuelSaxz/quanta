import { onboarding } from "@db/schema";
import { eq } from "drizzle-orm";
import type { OnboardingRepository } from "./onboarding.contracts";

export const OnboardingRepositoryFn: OnboardingRepository = ({ db }) => {
  return {
    async create(values) {
      const [newOnboarding] = await db
        .insert(onboarding)
        .values(values)
        .returning();

      return newOnboarding;
    },

    async delete(id) {
      await db.delete(onboarding).where(eq(onboarding.id, id));
    },

    async findById(id) {
      return await db.query.onboarding.findFirst({
        where: eq(onboarding.id, id),
      });
    },

    async findByUserId(userId) {
      return await db.query.onboarding.findFirst({
        where: eq(onboarding.userId, userId),
      });
    },

    async update(id, values) {
      const [updatedOnboarding] = await db
        .update(onboarding)
        .set(values)
        .where(eq(onboarding.id, id))
        .returning();

      return updatedOnboarding;
    },
  };
};
