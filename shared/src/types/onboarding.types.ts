import type { onboarding } from "@db/schema";
import type { OnboardingDto } from "@shared/dto";
import { z } from "zod";

export type Onboarding = typeof onboarding.$inferSelect;
export type InsertOnboarding = typeof onboarding.$inferInsert;
export type UpdateOnboarding = Partial<InsertOnboarding>;

export type CreateOnboardingDto = z.infer<typeof OnboardingDto.create>;
export type UpdateOnboardingDto = z.infer<typeof OnboardingDto.update>;
