import type { auth } from "./lib/auth";

export interface SessionVariables {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
}
