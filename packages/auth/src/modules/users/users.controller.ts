import { apps } from "@core";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "@server/index";
import { OnboardingDto } from "@shared/dto";
import { UsersDto } from "@shared/dto/users.dto";
import { EnsureAuthenticated } from "@shared/middleware/ensure_authenticated";
import { env } from "bun";
import { Hono } from "hono";
import { jwt } from "hono/jwt";

export function makeUsersController() {
  const containers = {
    users: apps.users,
    sessions: apps.sessions,
    onboarding: apps.onboarding,
  };

  const MESSAGE = {
    GET_SUCCESS: "Usuário recuperado com sucesso",
    GET_ONBOARDING_SUCCESS: "Avaliação recuperada com sucesso",
    LOGIN_SUCCESS: "Login bem sucedido",
    REFRESH_SUCCESS: "Sessão atualizada com sucesso",
    REGISTER_SUCCESS: "Usuário registrado com sucesso",
    UPDATE_SUCCESS: "Usuário atualizado com sucesso",
    ONBOARDING_CREATE_SUCCESS: "Avaliação criada com sucesso",
    LOGOUT_SUCCESS: "Sessão encerrada com sucesso",
  };

  return new Hono<{ Variables: AppVariables }>()
    .post("/register", zValidator("json", UsersDto.create), async (c) => {
      const values = c.req.valid("json");

      const user = await containers.users.service.create({
        values,
      });

      const { accessToken } = await containers.sessions.service.create({
        userId: user.id,
      });

      console.log("Access Token", accessToken);

      return c.json(
        {
          success: true,
          data: {
            user,
            accessToken,
          },
          message: MESSAGE.REGISTER_SUCCESS,
        },
        201
      );
    })
    .post("/login", zValidator("json", UsersDto.login), async (c) => {
      const values = c.req.valid("json");

      const user = await containers.users.service.login({
        email: values.email,
        password: values.password,
      });

      const { accessToken } = await containers.sessions.service.create({
        userId: user.id,
      });

      return c.json({
        success: true,
        data: {
          user,
          accessToken,
        },
        message: MESSAGE.LOGIN_SUCCESS,
      });
    })
    .get(
      "/",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      async (c) => {
        const userId = c.get("userId");

        const user = await containers.users.service.getById({
          userId,
        });

        return c.json({
          success: true,
          data: user,
          message: MESSAGE.GET_SUCCESS,
        });
      }
    )
    .get(
      "/refresh",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      async (c) => {
        const userId = c.get("userId");
        const sessionId = c.get("sessionId");

        const session = await containers.sessions.service.find({
          sessionId,
          userId,
        });

        const { accessToken } = await containers.sessions.service.refresh({
          sessionId: session.id,
          userId,
        });

        return c.json({
          success: true,
          data: {
            accessToken,
          },
          message: MESSAGE.REFRESH_SUCCESS,
        });
      }
    )
    .delete(
      "/",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      async (c) => {
        const userId = c.get("userId");

        await containers.users.service.delete({
          userId,
        });

        return c.status(204);
      }
    )
    .put(
      "/",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      zValidator("json", UsersDto.update),
      async (c) => {
        const userId = c.get("userId");
        const values = c.req.valid("json");

        const user = await containers.users.service.update({
          userId,
          values,
        });

        return c.json({
          success: true,
          data: user,
          message: MESSAGE.UPDATE_SUCCESS,
        });
      }
    )
    .get(
      "/onboarding",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      async (c) => {
        const userId = c.get("userId");

        const onboarding = await containers.onboarding.service.getByUserId({
          userId,
        });

        return c.json({
          success: true,
          data: onboarding,
          message: MESSAGE.GET_ONBOARDING_SUCCESS,
        });
      }
    )
    .post(
      "/onboarding/create",
      jwt({
        secret: env.JWT_SECRET!,
      }),
      EnsureAuthenticated,
      zValidator("json", OnboardingDto.create),
      async (c) => {
        const userId = c.get("userId");
        const values = c.req.valid("json");

        const onboarding = await containers.onboarding.service.insert({
          userId,
          values,
        });

        return c.json({
          success: true,
          data: onboarding,
          message: MESSAGE.ONBOARDING_CREATE_SUCCESS,
        });
      }
    )
    .get(
      "/logout",
      jwt({ secret: env.JWT_SECRET! }),
      EnsureAuthenticated,
      async (c) => {
        const userId = c.get("userId");
        const sessionId = c.get("sessionId");

        await containers.sessions.service.update({
          id: sessionId,
          values: {
            revokedAt: new Date(),
          },
        });

        return c.json({
          success: true,
          message: MESSAGE.LOGOUT_SUCCESS,
        });
      }
    );
}
