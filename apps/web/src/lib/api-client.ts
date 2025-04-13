import type { AppType } from "api/types";
import { hc } from "hono/client";

export const api = hc<AppType>("http://localhost:8787", {
	init: { credentials: "include" },
});
