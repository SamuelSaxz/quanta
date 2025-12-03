import type { GlobalContainer } from "@shared/config";
import type { HabitService } from "./habits.contracts";
import { HabitsRepositoryFn } from "./habits.repository";
import { HabitsServiceFn } from "./habits.service";

export const makeHabitContainer: GlobalContainer<
  {},
  ReturnType<HabitService>
> = function ({ db: injectedDb }) {
  const dependencies = {
    db: injectedDb,
    mapper: {},
    repository: {
      habits: HabitsRepositoryFn,
    },
    container: {},
  };

  const service = HabitsServiceFn(dependencies);

  return {
    mapper: dependencies.mapper,
    service,
  };
};
