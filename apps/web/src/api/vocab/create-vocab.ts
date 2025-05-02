import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/api-client";

export const useCreateVocabMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ front, back }: { front: string; back: string }) => {
			return api.vocab.$post({ json: { front, back } });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vocab"] });
		},
	});
};
