"use server";
import ClientComponent from "./components/ClientComponent";
import { fetchAccessToken } from "hume";

export default async function Page() {
	const accessToken = await fetchAccessToken({
		apiKey: process.env.HUME_API_KEY,
		secretKey: process.env.HUME_SECRET_KEY,
	});

	if (!accessToken) throw new Error("Failed to fetch access token");

	return <ClientComponent accessToken={accessToken} />;
}
