import { type BetterAuthOptions, betterAuth } from "better-auth";

type Options = BetterAuthOptions &
	Required<Pick<BetterAuthOptions, "baseURL" | "secret">>;

export function createBetterAuth({ baseURL, secret, ...options }: Options) {
	return betterAuth({
		baseURL,
		basePath: "/auth",
		secret,
		database: options.database,
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 5 * 60, // 5 minutes
			},
		},
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
		...options,
	});
}
