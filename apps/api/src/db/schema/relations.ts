import { relations } from "drizzle-orm";

import { user } from "./auth";
import { vocabulary } from "./vocab";

export const userRelations = relations(user, ({ many }) => ({
	vocabulary: many(vocabulary),
}));
