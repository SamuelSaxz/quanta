import type {
  UsersMapper,
  UsersService,
} from "@auth/modules/users/users.contracts";
import { UsersMapperFn } from "@auth/modules/users/users.mapper";
import { UsersRepositoryFn } from "@auth/modules/users/users.repository";
import { UsersServiceFn } from "@auth/modules/users/users.service";
import type { GlobalContainer } from "@shared/config";

export const makeUsersContainer: GlobalContainer<
  {
    users: UsersMapper;
  },
  ReturnType<UsersService>
> = function ({ db: injectedDb }) {
  const dependencies = {
    db: injectedDb,
    mapper: {
      users: UsersMapperFn,
    },
    repository: {
      users: UsersRepositoryFn,
    },
    container: {},
  };

  const service = UsersServiceFn(dependencies);

  return {
    mapper: dependencies.mapper,
    service,
  };
};
