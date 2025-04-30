import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Form } from "react-aria-components";

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
import { api } from "../../lib/api-client";

export const Route = createFileRoute("/_app/vocab")({
	component: RouteComponent,
});

function RouteComponent() {
	const [open, setOpen] = useState(false);
	const [isPending, setIsPending] = useState(false);

	return (
		<div>
			<DialogTrigger isOpen={open} onOpenChange={setOpen}>
				<Button>Create</Button>
				<Dialog>
					<DialogTitle>New card</DialogTitle>
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							setIsPending(true);
							const formData = new FormData(e.currentTarget);
							const res = await api.vocab.$post({
								json: {
									front: formData.get("front") as string,
									back: formData.get("back") as string,
								},
							});
							if (res.ok) {
								setOpen(false);
							}
							setIsPending(false);
						}}
					>
						<DialogBody>
							<FieldGroup>
								<TextField label="Front" name="front" autoFocus />
								<TextField label="Back" name="back" />
							</FieldGroup>
						</DialogBody>
						<DialogActions>
							<Button intent="plain" slot="close">
								Cancel
							</Button>
							<Button intent="primary" type="submit" isPending={isPending}>
								Create
							</Button>
						</DialogActions>
					</Form>
				</Dialog>
			</DialogTrigger>
		</div>
	);
}
