import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

export function createClient(connectionString: string) {
	const sql = neon(connectionString);
	return drizzle({ client: sql, schema });
}

export type DB = ReturnType<typeof createClient>;
