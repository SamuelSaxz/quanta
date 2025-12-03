import { habitsFrequencies, habitsTimes, habitsTypes } from "@db/schema";
import { z } from "zod";

const name = z.object({
  value: z.string().min(3, "Insira um nome para o hábito!"),
});
const type = z.object({ value: z.enum(habitsTypes.enumValues) });
const repeatTarget = z.object({ value: z.number().optional() });
const frequency = z.object({ value: z.enum(habitsFrequencies.enumValues) });
const frequencyDays = z.object({ value: z.array(z.number()) });
const preferredTime = z.object({ value: z.enum(habitsTimes.enumValues) });
const reminderEnabled = z.object({
  value: z.boolean(),
});
const motivation = z.object({
  value: z.string().min(3, "Insira uma motivação!"),
});

const create = z.object({
  name: name.shape.value,
  type: type.shape.value,
  repeatTarget: repeatTarget.shape.value,
  frequency: frequency.shape.value,
  frequencyDays: frequencyDays.shape.value,
  preferredTime: preferredTime.shape.value,
  reminderEnabled: reminderEnabled.shape.value,
  motivation: motivation.shape.value,
});

const update = create.partial();

export const HabitsDto = {
  create,
  update,

  name,
  type,
  repeatTarget,
  frequency,
  frequencyDays,
  preferredTime,
  reminderEnabled,
  motivation,
};
