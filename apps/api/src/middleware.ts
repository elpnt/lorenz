import { createMiddleware } from "hono/factory";

import { auth } from "./lib/auth";
import type { SessionVariables } from "./types";

export const authMiddleware = createMiddleware<{ Variables: SessionVariables }>(
	async (c, next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });

		if (!session) {
			c.set("user", null);
			c.set("session", null);
			return next();
		}

		console.log(session.user, session.session);

		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	},
);
