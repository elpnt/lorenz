import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import { createAPIClient } from "../../lib/api-client";

const fetchVocab = createServerFn({ method: "GET" }).handler(async () => {
	const api = createAPIClient();
	const res = await api.vocab.$get();
	return res.json();
});

export const vocabQueryOptions = () => {
	return queryOptions({
		queryKey: ["vocab"],
		queryFn: fetchVocab,
	});
};
