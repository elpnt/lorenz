import { relations } from "drizzle-orm";

import { user } from "./auth";
import { vocabularies } from "./vocab";

export const userRelations = relations(user, ({ many }) => ({
	vocabularies: many(vocabularies),
}));
