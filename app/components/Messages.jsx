"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
	const { messages } = useVoice();

	return (
		<div className="max-w-5xl">
			{messages.map((msg, index) => {
				if (
					msg.type !== "user_message" &&
					msg.type !== "assistant_message"
				)
					return null;

				const { role, content } = msg.message;
				return (
					<div
						key={msg.type + index}
						className={`chat ${
							role === "assistant" ? "chat-start" : "chat-end"
						}`}>
						<div
							className={`chat-bubble ${
								role === "assistant" &&
								"bg-primary-content text-primary"
							}`}>
							{content}
						</div>
					</div>
				);
			})}
		</div>
	);
}
