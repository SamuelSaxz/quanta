import type {
  GlobalMapper,
  GlobalRepository,
  GlobalRepositoryMethods,
  GlobalService,
} from "@shared/config";
import type {
  CreateHabitsDto,
  Habit,
  InsertHabit,
  UpdateHabit,
  UpdateHabitsDto,
} from "@shared/types";

export type HabitRepository = GlobalRepository<
  InsertHabit,
  UpdateHabit,
  Habit,
  {
    findByUserId: (userId: Habit["userId"]) => Promise<Habit[]>;
  },
  keyof GlobalRepositoryMethods<InsertHabit, UpdateHabit, Habit>,
  "findAll"
>;

export type HabitMapper = GlobalMapper<{}>;

export interface HabitDependencies {
  repository: { habits: HabitRepository };
  mapper: { habits: HabitMapper };
}

export type HabitService = GlobalService<
  HabitDependencies["repository"],
  {},
  {},
  {
    create: (deps: {
      userId: Habit["userId"];
      values: CreateHabitsDto;
    }) => Promise<Habit>;

    getByUserId: (deps: { userId: Habit["userId"] }) => Promise<Habit[]>;

    update: (deps: {
      id: Habit["id"];
      values: UpdateHabitsDto;
    }) => Promise<Habit>;

    delete: (deps: { id: Habit["id"] }) => Promise<void>;
  }
>;
