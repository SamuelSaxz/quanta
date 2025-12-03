import { apps } from "@core";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "@server/index";
import { env } from "@shared/config";
import { HabitsDto } from "@shared/dto";
import { EnsureAuthenticated } from "@shared/middleware/ensure_authenticated";
import { Hono } from "hono";
import { jwt } from "hono/jwt";

export const makeHabitsController = () => {
  const router = new Hono<{ Variables: AppVariables }>();

  const containers = {
    habits: apps.habits,
  };

  router.use(
    "*",
    jwt({
      secret: env.JWT_SECRET!,
    })
  );

  const MESSAGE = {
    GET_SUCCESS: "Habit recuperado com sucesso",
    GET_ALL_SUCCESS: "Todos os habits recuperados com sucesso",
    CREATE_SUCCESS: "Habit criado com sucesso",
    UPDATE_SUCCESS: "Habit atualizado com sucesso",
    DELETE_SUCCESS: "Habit excluído com sucesso",
  };

  return router.post(
    "/",
    EnsureAuthenticated,
    zValidator("json", HabitsDto.create),
    async (c) => {
      const userId = c.get("userId");
      const values = c.req.valid("json");

      const habit = await containers.habits.service.create({ userId, values });

      return c.json({
        success: true,
        data: habit,
        message: MESSAGE.CREATE_SUCCESS,
      });
    }
  );
};
