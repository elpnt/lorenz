import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

dotenv.config({ path: ".dev.vars" });

const db = drizzle(process.env.DATABASE_URL);

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	secret: process.env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	trustedOrigins: ["http://localhost:3000"],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
