import { AppError } from "@shared/utils";
import type { HabitService } from "./habits.contracts";

export const HabitsServiceFn: HabitService = ({ db, repository }) => {
  const habitRepository = repository.habits({ db });

  return {
    async create({ userId, values }) {
      const newHabit = await habitRepository.create({
        ...values,
        userId,
      });

      if (!newHabit)
        throw new AppError("DATABASE_ERROR", "Habit não foi criado");

      return newHabit;
    },

    async getByUserId({ userId }) {
      const habits = await habitRepository.findByUserId(userId);

      if (!habits)
        throw new AppError("DATABASE_ERROR", "Habit não foi encontrado");

      return habits;
    },

    async update({ id, values }) {
      const updatedHabit = await habitRepository.update(id, values);

      if (!updatedHabit)
        throw new AppError("DATABASE_ERROR", "Habit não foi atualizado");

      return updatedHabit;
    },

    async delete({ id }) {
      const deletedHabit = await habitRepository.delete(id);

      return deletedHabit;
    },
  };
};
