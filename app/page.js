import ClientComponent from "./components/ClientComponent";
import { getAccessToken } from "@/utils/getAccessToken";

export default async function Page() {
	const accessToken = await getAccessToken();

	if (!accessToken) throw new Error("Failed to fetch access token");

	return <ClientComponent accessToken={accessToken} />;
}
