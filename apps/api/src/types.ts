import type { auth } from "./lib/auth";

export interface Env {
	Bindings: Bindings;
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}
