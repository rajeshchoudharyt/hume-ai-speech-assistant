import ClientComponent from "./components/ClientComponent";
import { fetchAccessToken } from "hume";

const HUME_SECRET_KEY = process.env.HUME_SECRET_KEY;
const HUME_API_KEY = process.env.HUME_API_KEY;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
	const accessToken = await fetchAccessToken({
		apiKey: HUME_API_KEY,
		secretKey: HUME_SECRET_KEY,
	});

	if (!accessToken) throw new Error("Failed to fetch access token");

	return <ClientComponent accessToken={accessToken} />;
}
