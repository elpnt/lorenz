import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Form } from "react-aria-components";

import { useCreateVocabMutation } from "../../api/vocab/create-vocab";
import { vocabQueryOptions } from "../../api/vocab/get-vocab";
import { Button } from "../../components/ui/button";
import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";
import { FieldGroup } from "../../components/ui/fieldset";
import { TextField } from "../../components/ui/text-field";

export const Route = createFileRoute("/_app/vocab")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(vocabQueryOptions());
	},
});

function RouteComponent() {
	const [open, setOpen] = useState(false);

	const vocabQuery = useSuspenseQuery(vocabQueryOptions());
	const mutation = useCreateVocabMutation();

	return (
		<div className="p-4">
			<DialogTrigger isOpen={open} onOpenChange={setOpen}>
				<Button>Create</Button>
				<Dialog>
					<DialogTitle>New card</DialogTitle>
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							const front = formData.get("front") as string;
							const back = formData.get("back") as string;
							console.log("form:", { front, back });
							// await mutation.mutateAsync({ data: { front, back } });
							mutation.mutate({ front, back });
							setOpen(false);
						}}
					>
						<DialogBody>
							<FieldGroup>
								<TextField
									label="Front"
									name="front"
									autoFocus
									autoComplete="off"
								/>
								<TextField label="Back" name="back" autoComplete="off" />
							</FieldGroup>
						</DialogBody>
						<DialogActions>
							<Button intent="plain" slot="close">
								Cancel
							</Button>
							<Button
								intent="primary"
								type="submit"
								isPending={mutation.isPending}
							>
								Create
							</Button>
						</DialogActions>
					</Form>
				</Dialog>
			</DialogTrigger>
			<pre className="text-xs">{JSON.stringify(vocabQuery.data, null, 2)}</pre>
		</div>
	);
}
