import { env } from "@shared/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "packages/db/drizzle",
  schema: "packages/db/src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
});
