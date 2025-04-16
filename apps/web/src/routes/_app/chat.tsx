import { useChat } from "@ai-sdk/react";
import { createFileRoute } from "@tanstack/react-router";

import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { Button } from "../../components/ui/button";
import { Text } from "../../components/ui/text";

export const Route = createFileRoute("/_app/chat")({
	component: RouteComponent,
});

const UserMessage = ({ text }: { text: string }) => (
	<div className="flex justify-end">
		<div className="max-w-lg bg-zinc-100 px-4 py-2.5 dark:bg-zinc-700 dark:text-white rounded-xl text-sm">
			{text}
		</div>
	</div>
);

function RouteComponent() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "http://localhost:8787/chat",
		maxSteps: 2,
	});

	return (
		<>
			<div className="flex-1 overflow-y-scroll p-6 lg:p-10 ">
				<div className="mx-auto max-w-3xl space-y-8">
					{messages.map((message) => (
						<div key={message.id} className="whitespace-pre-wrap">
							{message.role === "user" ? (
								<UserMessage text={message.content} />
							) : (
								<Text>
									{message.parts.map((part, i) => {
										switch (part.type) {
											case "text":
												return (
													<div key={`${message.id}-${i}`}>{part.text}</div>
												);
											case "tool-invocation":
												return <div>{part.toolInvocation.result}</div>;
										}
									})}
								</Text>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="p-6">
				<div className="max-w-3xl mx-auto">
					<form onSubmit={handleSubmit}>
						<textarea
							placeholder="Ask anything..."
							value={input}
							onChange={handleInputChange}
							className="text-base/6 sm:text-sm/6 resize-none size-full focus:outline-none"
						/>
						<div className="flex justify-end">
							<Button type="submit" size="icon">
								<PaperAirplaneIcon />
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
