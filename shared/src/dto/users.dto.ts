import { z } from "zod";

const create = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.email("Insira um email válido").min(3, "Email é obrigatório"),
  password: z.string().min(3, "Senha é obrigatório"),
});

const login = create.pick({
  email: true,
  password: true,
});

const update = create.partial();

const params = {
  id: z.object({
    userId: z.coerce.number(),
  }),
};

export const UsersDto = {
  create,
  login,
  update,

  params,
};
