import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

export function createDb(connectionString: string) {
	const sql = neon(connectionString);
	return drizzle({ client: sql, schema });
}
