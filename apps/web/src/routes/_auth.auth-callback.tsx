import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/_auth/auth-callback")({
	component: AuthCallback,
});

function AuthCallback() {
	const router = useRouter();

	useEffect(() => {
		let canceled = false;
		async function pollSession() {
			for (let i = 0; i < 10; i++) {
				const { data: session } = await authClient.getSession();
				if (session) {
					router.navigate({ to: "/" });
					return;
				}
				await new Promise((res) => setTimeout(res, 1000));
				if (canceled) return;
			}
			router.navigate({ to: "/login" });
		}
		pollSession();
		return () => {
			canceled = true;
		};
	}, [router]);

	return (
		<div>
			<svg
				className="mr-3 -ml-1 size-5 animate-spin text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		</div>
	);
}
