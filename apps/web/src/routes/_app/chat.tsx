import { useChat } from "@ai-sdk/react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import type { ToolResult } from "api/types";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_app/chat")({
	component: RouteComponent,
});

const UserMessage = ({ text }: { text: string }) => (
	<div className="flex justify-end">
		<div className="max-w-lg bg-zinc-100 px-4 py-2.5 dark:bg-zinc-700 dark:text-white rounded-xl">
			{text}
		</div>
	</div>
);

function RouteComponent() {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "http://localhost:8787/chat",
		maxSteps: 2,
	});

	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<>
			<div className="flex-1 overflow-y-scroll p-6 lg:p-10 ">
				<div className="mx-auto max-w-3xl space-y-8">
					{messages.map((message) => (
						<div key={message.id} className="whitespace-pre-wrap">
							{message.role === "user" ? (
								<UserMessage text={message.content} />
							) : (
								<div className="">
									{message.parts.map((part, index) => {
										switch (part.type) {
											case "text":
												return <div key={part.text}>{part.text}</div>;
											case "tool-invocation": {
												const callId = part.toolInvocation.toolCallId;
												switch (part.toolInvocation.state) {
													case "call":
														return <div key={callId}>Fixing...</div>;
													case "partial-call":
														return <div key={callId}>Partial call...</div>;
													case "result": {
														const result: ToolResult["result"] =
															part.toolInvocation.result;
														return (
															<pre key={callId} className="text-xs">
																{JSON.stringify(
																	part.toolInvocation.result,
																	null,
																	2,
																)}
															</pre>
														);
													}
												}
											}
										}
									})}
									{/* <pre className="text-xs">
										{JSON.stringify(message.parts, null, 2)}
									</pre> */}
									{/* {message.parts.map((part, i) => {
										switch (part.type) {
											case "text":
												return (
													<div key={`${message.id}-${i}`}>{part.text}</div>
												);
											case "tool-invocation":
												return (
													// <div>{part.toolInvocation.result.corrected}</div>
													<pre className="text-xs">
														{JSON.stringify(part.toolInvocation, null, 2)}
													</pre>
												);
										}
									})} */}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="p-6">
				<div className="max-w-3xl mx-auto">
					<form
						onSubmit={(e) => {
							handleSubmit(e);
							inputRef.current?.focus();
						}}
					>
						<textarea
							ref={inputRef}
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
