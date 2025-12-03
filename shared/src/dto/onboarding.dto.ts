import { z } from "zod";

const question = z.object({
  value: z.number().min(1, "Número deve ser maior que zero"),
});

const create = z.object({
  questionOne: question.shape.value,
  questionTwo: question.shape.value,
  questionThree: question.shape.value,
  questionFour: question.shape.value,
  questionFive: question.shape.value,
  questionSix: question.shape.value,
});

const update = create.partial();

export const OnboardingDto = {
  create,
  update,

  question,
};
