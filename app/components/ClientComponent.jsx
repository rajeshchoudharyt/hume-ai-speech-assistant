"use client";

import Messages from "./Messages";
import Controls from "./Controls";

import { VoiceProvider } from "@humeai/voice-react";
import { fetchSimilarData } from "@/utils/pinecone";

export default function ClientComponent({ accessToken }) {
	return (
		<VoiceProvider
			configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
			auth={{ type: "accessToken", value: accessToken }}
			onToolCall={handleToolCall}>
			<div className="w-[100lvw-2rem] flex flex-col justify-between min-h-[calc(100lvh-2rem)] m-4">
				<Messages />
				<Controls />
			</div>
		</VoiceProvider>
	);
}

const handleToolCall = async (message, socket) => {
	if (message.name === "retrieve_podcast_data") {
		try {
			const { query } = JSON.parse(message.parameters);

			const data = await fetchSimilarData(query);

			const toolResponseMessage = {
				type: "tool_response",
				toolCallId: message.toolCallId,
				content: data,
			};

			return socket.success(toolResponseMessage);

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
