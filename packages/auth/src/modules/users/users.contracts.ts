import type {
  GlobalMapper,
  GlobalRepository,
  GlobalRepositoryMethods,
  GlobalService,
} from "@shared/config";
import type {
  CreateUsersDto,
  InsertUser,
  LoginUsersDto,
  UpdateUser,
  UpdateUsersDto,
  User,
  UserSafe,
} from "@shared/types/users.types";

export type UsersRepository = GlobalRepository<
  InsertUser,
  UpdateUser,
  User,
  {
    findByEmail: (email: User["email"]) => Promise<User | undefined>;
  },
  keyof GlobalRepositoryMethods<InsertUser, UpdateUser, User>,
  "findAll"
>;

export type UsersMapper = GlobalMapper<{
  toUserSafe: (deps: { user: User }) => UserSafe;
}>;

export interface UsersDependencies {
  repository: { users: UsersRepository };
  mapper: { users: UsersMapper };
}

export type UsersService = GlobalService<
  UsersDependencies["repository"],
  UsersDependencies["mapper"],
  {},
  {
    create: (deps: { values: CreateUsersDto }) => Promise<UserSafe>;
    delete: (deps: { userId: User["id"] }) => Promise<void>;
    getById: (deps: { userId: User["id"] }) => Promise<UserSafe>;
    getByEmail: (deps: { email: User["email"] }) => Promise<UserSafe>;
    login: (deps: LoginUsersDto) => Promise<UserSafe>;
    update: (deps: {
      userId: User["id"];
      values: UpdateUsersDto;
    }) => Promise<UserSafe>;
  }
>;
