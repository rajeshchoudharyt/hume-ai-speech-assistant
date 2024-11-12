"use client";

import { useVoice } from "@humeai/voice-react";

export default function Controls() {
	const { connect, disconnect, status } = useVoice();

	const handleClick = () => {
		if (status.value === "connected") {
			disconnect();
		} else {
			try {
				connect();
			} catch (error) {
				console.log("Error connecting:", error);
			}
		}
	};

	return (
		<button
			disabled={status.value === "connecting"}
			onClick={handleClick}
			className="bg-gray-300 py-2 px-4 hover:bg-gray-300/80">
			{status.value === "connected" ? "Stop" : "Start"}
		</button>
	);
}
