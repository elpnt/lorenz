import { getHeaders } from "@tanstack/react-start/server";
import { getSession } from "./auth-client";

export function getServerSession() {
	return getSession({
		fetchOptions: {
			headers: getHeaders() as HeadersInit,
		},
	});
}
