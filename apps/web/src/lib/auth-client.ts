import { createAuthClient } from "better-auth/react";
import { reactStartCookies } from "better-auth/react-start";

export const { getSession, useSession, signIn, signUp, signOut, deleteUser } =
	createAuthClient({
		baseURL: "http://localhost:8787",
		basePath: "/auth",
		fetchOptions: {
			credentials: "include",
		},
		plugins: [reactStartCookies()],
	});
