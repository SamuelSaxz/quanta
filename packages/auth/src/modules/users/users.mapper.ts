import type { UsersMapper } from "@auth/modules/users/users.contracts";

export const UsersMapperFn: UsersMapper = () => ({
  toUserSafe({ user }) {
    return {
      ...user,
      password: undefined,
    };
  },
});
