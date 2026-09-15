import "server-only";

import { drizzle } from "drizzle-orm/neon-http";

let client: ReturnType<typeof drizzle> | undefined;

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to read Projects");
  }

  client ??= drizzle(databaseUrl);
  return client;
}
