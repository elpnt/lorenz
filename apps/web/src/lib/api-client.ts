import { hcWithType } from "@lorenz/api/hc";
import { getHeaders } from "@tanstack/react-start/server";

export const api = hcWithType("http://localhost:8787", {
	init: { credentials: "include" },
});

export const createAPIClient = () => {
	const headers = getHeaders() as HeadersInit;
	return hcWithType("http://localhost:8787", {
		init: {
			headers,
			credentials: "include",
		},
	});
};
