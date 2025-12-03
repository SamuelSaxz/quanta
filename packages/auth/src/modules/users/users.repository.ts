import type { UsersRepository } from "@auth/modules/users/users.contracts";
import { users } from "@db/schema/users.sql";
import { eq } from "drizzle-orm";

export const UsersRepositoryFn: UsersRepository = ({ db }) => {
  return {
    async create(values) {
      const [newUser] = await db.insert(users).values(values).returning();

      return newUser;
    },

    async delete(id) {
      await db.delete(users).where(eq(users.id, id));
    },

    async findByEmail(email) {
      return await db.query.users.findFirst({
        where: eq(users.email, email),
      });
    },

    async findById(id) {
      return await db.query.users.findFirst({
        where: eq(users.id, id),
      });
    },

    async update(id, values) {
      const [updatedUser] = await db
        .update(users)
        .set(values)
        .where(eq(users.id, id))
        .returning();

      return updatedUser;
    },
  };
};
