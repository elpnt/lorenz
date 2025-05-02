import type { AppType } from "@lorenz/api/types";
import { getHeaders } from "@tanstack/react-start/server";
import { hc } from "hono/client";

export const api = hc<AppType>("http://localhost:8787", {
	init: { credentials: "include" },
});

export const createAPIClient = () => {
	const headers = getHeaders() as HeadersInit;
	return hc<AppType>("http://localhost:8787", {
		init: {
			headers,
			credentials: "include",
		},
	});
};
