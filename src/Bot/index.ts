import "dotenv/config";
import Client from "./classes/Client";

export async function initialize() {
	const client = new Client();
	client.start(process.env.TOKEN);
}

export default { initialize };
