"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
	const { messages } = useVoice();

	return (
		<div className="w-full">
			{messages.length === 0 && (
				<p className="text-primary text-center mt-[40lvh]">
					Welcome to speech assistant. How can I optimize your health?
				</p>
			)}
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
								"bg-base-200 text-primary"
							}`}>
							{content}
						</div>
					</div>
				);
			})}
		</div>
	);
}
