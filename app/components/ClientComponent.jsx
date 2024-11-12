"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

export default function ClientComponent({ accessToken }) {
	return (
		<VoiceProvider
			configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
			auth={{ type: "accessToken", value: accessToken }}
			onToolCall={handleToolCall}>
			<Messages />
			<Controls />
		</VoiceProvider>
	);
}

const handleToolCall = async (message, socket) => {
	console.log("message", message);

	if (message.name === "retrieve_Vector_Embeddings") {
		try {
			const { prompt } = JSON.parse(message.parameters);
			console.log(prompt);

			const data = "";

			const toolResponseMessage = {
				type: "tool_response",
				toolCallId: message.toolCallId,
				content: data,
			};

			return socket.sendToolResponseMessage(toolResponseMessage);

			//
		} catch (error) {
			return socket.error({
				error: "Embeddings retrieval error",
				code: 400,
			});
		}
	}

	return socket.error({
		error: "Tool not found",
		code: 401,
	});
};
