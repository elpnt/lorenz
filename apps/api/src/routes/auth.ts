import { Hono } from "hono";

import { auth } from "../lib/auth";
import type { Env } from "../types";

const app = new Hono<Env>().on(["POST", "GET"], "*", (c) =>
	auth.handler(c.req.raw),
);

export default app;
