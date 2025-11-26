import "dotenv/config";
import { z } from "zod";

const config = z.object({
  // App
  CORS_ORIGIN: z.url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  // Database
  DATABASE_URL: z.string(),
  // Session
  ACCESS_TTL: z.coerce.number(),
  REFRESH_TTL: z.coerce.number(),
  JWT_SECRET: z.string(),
});

export const env = config.parse(process.env);
export type Env = typeof env;
