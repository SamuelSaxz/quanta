import { apps } from "@core";
import type { AppVariables } from "@server/index";
import { AppError } from "@shared/utils";
import type { Context, Next } from "hono";

export const EnsureAuthenticated = async (c: Context, next: Next) => {
  const jwtPayload = c.get("jwtPayload") as AppVariables["jwtPayload"];

  if (!jwtPayload) {
    throw new AppError("UNAUTHORIZED", "Usuário não autenticado");
  }

  await apps.sessions.service.verify({
    sessionId: jwtPayload.sessionId,
    userId: jwtPayload.sub,
  });

  c.set("userId", jwtPayload.sub);
  c.set("sessionId", jwtPayload.sessionId);

  await next();
};
