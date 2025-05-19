import { useChat } from "@ai-sdk/react";
import {
	InformationCircleIcon,
	PaperAirplaneIcon,
	StopIcon,
} from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import type { ToolResult } from "@lorenz/api/types";
import type { UIMessage } from "ai";
import { useEffect, useRef } from "react";

import clsx from "clsx";
import { Button } from "./ui/button";

export function Note({ children }: { children: React.ReactNode }) {
	return (
		<div className="my-6 flex gap-2.5 rounded-2xl border border-orange-500/20 bg-orange-50/50 p-4 leading-6 text-orange-900 dark:border-orange-500/30 dark:bg-orange-500/5 dark:text-orange-200 dark:[--tw-prose-links-hover:theme(colors.orange.300)] dark:[--tw-prose-links:theme(colors.white)]">
			<InformationCircleIcon className="mt-1 h-4 w-4 flex-none fill-orange-500 stroke-white dark:fill-orange-200/20 dark:stroke-orange-200" />
			<div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
				{children}
			</div>
		</div>
	);
}

interface ChatProps {
	id: string;
	initialMessages?: UIMessage[];
}

export function Chat({ id, initialMessages }: ChatProps) {
	const { messages, input, handleInputChange, handleSubmit, status, stop } =
		useChat({
			id,
			api: "http://localhost:8787/chat",
			maxSteps: 2,
			initialMessages,
			experimental_prepareRequestBody: (body) => ({
				id,
				message: body.messages.at(-1),
			}),
			credentials: "include",
		});

	console.log({ messages });

	const inputRef = useRef<HTMLTextAreaElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: force scroll
	useEffect(() => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop =
				scrollContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<>
			<div
				ref={scrollContainerRef}
				className="flex-1 overflow-y-scroll p-6 lg:p-10"
			>
				<div className="mx-auto max-w-3xl space-y-12">
					{messages.map((message, i) => (
						<div
							key={message.id}
							className={clsx(
								message.role === "user" &&
									"flex justify-end items-center gap-1",
							)}
						>
							{/* {message.role === "user" && } */}
							{message.parts.map((part, index) => {
								switch (part.type) {
									case "text":
										if (message.role === "user") {
											const ok = (function getProofreadOK() {
												const nextMsg = messages[i + 1];
												if (
													nextMsg &&
													nextMsg.role !== "user" &&
													nextMsg.parts?.some(
														(part) =>
															part.type === "tool-invocation" &&
															part.toolInvocation.toolName === "proofread" &&
															part.toolInvocation.state === "result" &&
															part.toolInvocation.result &&
															part.toolInvocation.result.ok === true,
													)
												)
													return true;
												return false;
											})();
											return (
												<>
													{ok && (
														<div className="p-0.5 bg-emerald-500 rounded-full animate-scale-rotate-in flex items-center justify-center">
															<CheckIcon className="text-white stroke-4 size-4" />
														</div>
													)}
													<div className="max-w-64 sm:max-w-lg bg-zinc-100 px-4 py-2.5 dark:bg-zinc-700 dark:text-white rounded-xl">
														{part.text}
													</div>
												</>
											);
										}
										return (
											// biome-ignore lint:
											<div key={index} className="dark:text-white">
												{part.text}
											</div>
										);
									case "tool-invocation": {
										const callId = part.toolInvocation.toolCallId;
										switch (part.toolInvocation.state) {
											case "partial-call":
											case "call":
												return (
													<div key={callId} className="animate-pulse">
														Reviewing...
													</div>
												);
											case "result": {
												const result: ToolResult["result"] =
													part.toolInvocation.result;
												if (result.ok) return null;
												return (
													<Note key={callId}>
														<strong>{result.corrected}</strong>
														<p>{result.explanation}</p>
													</Note>
												);
											}
										}
									}
								}
							})}
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
							className="text-base/6 sm:text-sm/6 resize-none size-full focus:outline-none placeholder-zinc-500 dark:text-white"
							onKeyDown={(e) => {
								if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
									e.preventDefault();
									handleSubmit(e);
									inputRef.current?.focus();
								}
							}}
						/>
						<div className="flex justify-end">
							{status === "streaming" ? (
								<Button type="button" size="icon" onPress={stop}>
									<StopIcon />
								</Button>
							) : (
								<Button type="submit" size="icon">
									<PaperAirplaneIcon />
								</Button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
