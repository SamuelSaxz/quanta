import type { SessionsRepository } from "@auth/modules/sessions/sessions.contracts";
import { sessions } from "@db/schema/sessions.sql";
import { and, desc, eq } from "drizzle-orm";

export const SessionsRepositoryFn: SessionsRepository = ({ db }) => {
  return {
    async create(values) {
      const [newSession] = await db.insert(sessions).values(values).returning();

      return newSession;
    },

    async find(sessionId, userId) {
      return await db.query.sessions.findFirst({
        where: and(eq(sessions.id, sessionId), eq(sessions.userId, userId)),
        orderBy: desc(sessions.createdAt),
      });
    },

    async findById(id) {
      return await db.query.sessions.findFirst({
        where: eq(sessions.id, id),
      });
    },

    async findByUserId(userId) {
      return await db.query.sessions.findFirst({
        where: eq(sessions.userId, userId),
      });
    },

    async update(id, values) {
      const [updatedSession] = await db
        .update(sessions)
        .set(values)
        .where(eq(sessions.id, id))
        .returning();

      return updatedSession;
    },
  };
};
