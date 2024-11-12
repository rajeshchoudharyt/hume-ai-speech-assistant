"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
	const { messages } = useVoice();

	return (
		<div>
			{messages.map((msg, index) => {
				if (
					msg.type !== "user_message" &&
					msg.type !== "assistant_message"
				)
					return null;

				const { role, content } = msg.message;
				return (
					<div key={msg.type + index}>
						<div>
							<strong>{role} </strong>
							{content}
						</div>
					</div>
				);
			})}
		</div>
	);
}
