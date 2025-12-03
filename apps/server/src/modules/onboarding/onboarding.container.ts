import type { GlobalContainer } from "@shared/config";
import type { OnboardingService } from "./onboarding.contracts";
import { OnboardingRepositoryFn } from "./onboarding.repository";
import { OnboardingServiceFn } from "./onboarding.service";

export const makeOnboardingContainer: GlobalContainer<
  {},
  ReturnType<OnboardingService>
> = function ({ db: injectedDb }) {
  const dependencies = {
    db: injectedDb,
    mapper: {},
    repository: {
      onboarding: OnboardingRepositoryFn,
    },
    container: {},
  };

  const service = OnboardingServiceFn(dependencies);

  return {
    mapper: dependencies.mapper,
    service,
  };
};
