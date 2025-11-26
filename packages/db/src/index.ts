import * as schema from "@db/schema";
import { env } from "@shared/config";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import {
  drizzle,
  type NodePgDatabase,
  type NodePgQueryResultHKT,
} from "drizzle-orm/node-postgres";
import type { PgTransaction } from "drizzle-orm/pg-core";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  casing: "snake_case",
  schema,
});

export type DB = NodePgDatabase<typeof schema>;

export type TX = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type DBOrTX = DB | TX;
