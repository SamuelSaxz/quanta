import { AppError } from "@shared/utils";
import type { OnboardingService } from "./onboarding.contracts";

export const OnboardingServiceFn: OnboardingService = ({ db, repository }) => {
  const onboardingRepository = repository.onboarding({ db });

  return {
    async getById({ id }) {
      const onboarding = await onboardingRepository.findById(id);

      if (!onboarding)
        throw new AppError("NOT_FOUND", "Avaliação não encontrada");

      return onboarding;
    },

    async getByUserId({ userId }) {
      const onboarding = await onboardingRepository.findByUserId(userId);

      if (!onboarding)
        throw new AppError("NOT_FOUND", "Avaliação não encontrada");

      return onboarding;
    },

    async insert({ userId, values }) {
      const newOnboarding = await onboardingRepository.create({
        ...values,
        userId,
      });

      if (!newOnboarding)
        throw new AppError("DATABASE_ERROR", "Falha ao inserir avaliação");

      return newOnboarding;
    },

    async update({ id, values }) {
      const updatedOnboarding = await onboardingRepository.update(id, values);

      if (!updatedOnboarding)
        throw new AppError("DATABASE_ERROR", "Falha ao atualizar avaliação");

      return updatedOnboarding;
    },
  };
};
