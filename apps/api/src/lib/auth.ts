import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

dotenv.config({ path: ".dev.vars" });

const db = drizzle(process.env.DATABASE_URL);

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL,
	basePath: "/auth",
	secret: process.env.BETTER_AUTH_SECRET,
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
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
	plugins: [
		reactStartCookies(), // make sure this is the last plugin in the array
	],
});
