import "dotenv/config";
import { z } from "zod";

const config = z.object({
  // App
  NODE_ENV: z.enum(["development", "production", "test"]),
  // Database
  DATABASE_URL: z.string(),
  // Session
  ACCESS_TTL: z.coerce.number(),
  REFRESH_TTL: z.coerce.number(),
  JWT_SECRET: z.string(),

  NGROK_TOKEN: z.string(),
});

export const env = config.parse(process.env);
export type Env = typeof env;
