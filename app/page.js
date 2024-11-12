import { getAccessToken } from "@/utils/getAccessToken";
import ClientComponent from "./components/ClientComponent";

export default async function Page() {
	const accessToken = await getAccessToken();

	if (!accessToken) throw new Error("Failed to fetch access token");

	return <ClientComponent accessToken={accessToken} />;
}
