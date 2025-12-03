import type { UsersService } from "@auth/modules/users/users.contracts";
import { AppError, hash } from "@shared/utils";

export const UsersServiceFn: UsersService = ({ db, mapper, repository }) => {
  const usersRepository = repository.users({ db });
  const usersMapper = mapper.users();

  return {
    async create({ values }) {
      const newUser = await usersRepository.create({
        ...values,
        password: hash.create(values.password),
      });

      if (!newUser)
        throw new AppError("DATABASE_ERROR", "Falha ao inserir usuário");

      return usersMapper.toUserSafe({ user: newUser });
    },

    async delete({ userId }) {
      const user = await usersRepository.findById(userId);

      if (!user) throw new AppError("NOT_FOUND", "Usuário não encontrado");

      return await usersRepository.delete(userId);
    },

    async getById({ userId }) {
      const user = await usersRepository.findById(userId);

      if (!user) throw new AppError("NOT_FOUND", "Usuário não encontrado");

      return usersMapper.toUserSafe({ user });
    },

    async getByEmail({ email }) {
      const user = await usersRepository.findByEmail(email);

      if (!user) throw new AppError("NOT_FOUND", "Email não encontrado");

      return usersMapper.toUserSafe({ user });
    },

    async login({ email, password }) {
      const user = await usersRepository.findByEmail(email);

      if (!user) throw new AppError("NOT_FOUND", "Usuário não encontrado");

      if (!hash.verify(password, user.password))
        throw new AppError("UNAUTHORIZED", "Usuário não autorizado");

      return usersMapper.toUserSafe({ user });
    },

    async update({ userId, values }) {
      const updatedUser = await usersRepository.update(userId, values);

      if (!updatedUser)
        throw new AppError("DATABASE_ERROR", "Falha ao atualizar usuário");

      return usersMapper.toUserSafe({ user: updatedUser });
    },
  };
};
