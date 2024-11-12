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
			className="btn btn-primary mx-auto mt-2 w-32 disabled:bg-primary disabled:text-primary-content">
			{status.value === "connected"
				? "Stop"
				: status.value === "disconnected"
				? "Start"
				: ""}
			{status.value === "connecting" ? (
				<span className="loading loading-dots loading-xs"></span>
			) : (
				""
			)}
		</button>
	);
}
