import { makeUsersController } from "@auth/modules/users/users.controller";
import type { Session, User } from "@shared/types";
import {
  AppError,
  ErrorCodeDatabaseMap,
  ErrorStatusMap,
  type RequestError,
} from "@shared/utils";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { makeHabitsController } from "./modules/habits/habits.controller";

export type AppVariables = {
  jwtPayload?: {
    sub: User["id"];
    sessionId: number;
    exp: number;
  };
  sessionId: Session["id"];
  userId: User["id"];
};

const app = new Hono<{ Variables: AppVariables }>();

app.use(
  "*",
  cors({
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
  }),
  async (c, next) => {
    await next();
  }
);

app.onError((error, c) => {
  console.log(error);

  if (error instanceof AppError) {
    return c.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      } satisfies RequestError,
      error.status as ContentfulStatusCode
    );
  }

  const cause = error.cause as { code: string };

  if (cause && cause.code in ErrorCodeDatabaseMap) {
    const code =
      ErrorCodeDatabaseMap[cause.code as keyof typeof ErrorCodeDatabaseMap];

    const status = ErrorStatusMap["DATABASE_ERROR"];

    return c.json(
      {
        success: false,
        error: {
          code,
          message: error.message,
        },
      },
      status
    );
  }

  return c.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
    },
    500
  );
});

const router = app
  .get("/ping", (c) => {
    // Test Hono
    return c.text("Hello Hono!");
  })
  .route("/auth", makeUsersController())
  .route("/habits", makeHabitsController());

export type AppType = typeof router;

export default {
  port: 8000,
  fetch: app.fetch,
};

// await ngrok.authtoken(env.NGROK_TOKEN);

// const tunnel = await ngrok.connect({ addr: 8000 });

// const publicUrl = tunnel.url()?.toString();

// console.log("===== NGROK ATIVO =====");
// console.log("URL pública:", publicUrl);
// console.log("========================");
