import type {
  GlobalMapper,
  GlobalRepository,
  GlobalRepositoryMethods,
  GlobalService,
} from "@shared/config";
import type {
  CreateOnboardingDto,
  InsertOnboarding,
  Onboarding,
  UpdateOnboarding,
  UpdateOnboardingDto,
} from "@shared/types";

export type OnboardingRepository = GlobalRepository<
  InsertOnboarding,
  UpdateOnboarding,
  Onboarding,
  {
    findByUserId: (
      userId: Onboarding["userId"]
    ) => Promise<Onboarding | undefined>;
  },
  keyof GlobalRepositoryMethods<InsertOnboarding, UpdateOnboarding, Onboarding>,
  "findAll"
>;

export type OnboardingMapper = GlobalMapper<{}>;

export interface OnboardingDependencies {
  repository: { onboarding: OnboardingRepository };
  mapper: { onboarding: OnboardingMapper };
}

export type OnboardingService = GlobalService<
  OnboardingDependencies["repository"],
  {},
  {},
  {
    getById: (deps: { id: Onboarding["id"] }) => Promise<Onboarding>;
    getByUserId: (deps: {
      userId: Onboarding["userId"];
    }) => Promise<Onboarding>;
    insert: (deps: {
      userId: Onboarding["userId"];
      values: CreateOnboardingDto;
    }) => Promise<Onboarding>;
    update: (deps: {
      id: Onboarding["id"];
      values: UpdateOnboardingDto;
    }) => Promise<Onboarding>;
  }
>;
