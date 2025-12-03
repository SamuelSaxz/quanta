import type { SessionsService } from "@auth/modules/sessions/sessions.contracts";
import { env } from "@shared/config";
import { AppError } from "@shared/utils";
import { randomBytes } from "crypto";
import { sign } from "hono/jwt";

export const SessionsServiceFn: SessionsService = ({ db, repository }) => {
  const sessionsRepository = repository.sessions({ db });

  return {
    async create({ userId }) {
      const refreshToken = randomBytes(64).toString("hex");

      const newSession = await sessionsRepository.create({
        refreshToken,
        userId,
        expiresAt: new Date(Date.now() + env.REFRESH_TTL),
      });

      if (!newSession)
        throw new AppError("DATABASE_ERROR", "Falha ao criar sessão");

      const accessToken = await sign(
        {
          sub: userId,
          sessionId: newSession.id,
          exp: Date.now() + env.ACCESS_TTL,
        },
        env.JWT_SECRET
      );

      return {
        accessToken: accessToken,
      };
    },

    async getById({ sessionId }) {
      const session = await sessionsRepository.findById(sessionId);

      if (!session) throw new AppError("NOT_FOUND", "Sessão não encontrada");

      return session;
    },

    async getByUserId({ userId }) {
      const session = await sessionsRepository.findByUserId(userId);

      if (!session) throw new AppError("NOT_FOUND", "Sessão não encontrada");

      return session;
    },

    async find({ sessionId, userId }) {
      const session = await sessionsRepository.find(sessionId, userId);

      if (!session) throw new AppError("NOT_FOUND", "Sessão não encontrada");

      return session;
    },

    async refresh({ sessionId, userId }) {
      await sessionsRepository.update(sessionId, {
        revokedAt: new Date(),
      });

      const { accessToken } = await this.create({
        userId,
      });

      return { accessToken };
    },

    async verify({ sessionId, userId }) {
      const session = await this.find({ sessionId, userId });

      if (!session)
        throw new AppError("UNAUTHORIZED", "Usuário não autorizado");

      if (session.revokedAt)
        throw new AppError("UNAUTHORIZED", "Sessão revogada");

      if (session.expiresAt < new Date())
        throw new AppError("UNAUTHORIZED", "Sessão expirada");

      return session;
    },

    async update({ id, values }) {
      const session = await sessionsRepository.update(id, values);

      if (!session)
        throw new AppError("DATABASE_ERROR", "Sessão não atualizada");

      return session;
    },
  };
};
