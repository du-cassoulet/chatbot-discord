import Discord from "discord.js";
import Event from "../classes/Event";
import Nlp from "../../Nlp";
import Client from "../classes/Client";

const MEMORY = 3;
const brain = new Nlp.Brain();

async function fetchConversation(
	message: Discord.Message<true>,
	number: number
): Promise<Discord.Message<true>[]> {
	try {
		const reference = await message.fetchReference();

		if (number <= 1) return [reference];
		return [reference, ...(await fetchConversation(reference, number - 1))];
	} catch {
		return [];
	}
}

function prepareContent(
	client: Client,
	message: Discord.Message<true>
): string {
	let content = message.cleanContent;

	if (message.content.startsWith(client.user.toString())) {
		content = content.slice(client.user.username.length + 1);
	}

	content = content.replace(/<:[a-zA-Z_]{2,}:\d+>/g, "");
	content = content.replace(/\s{2,}/g, " ");

	return content.trim();
}

export default new Event(
	Discord.Events.MessageCreate,
	async (client, message: Discord.Message<true>) => {
		if (message.author.bot || !message.guild) return;

		const cleanContent = prepareContent(client, message);
		const history = await fetchConversation(message, MEMORY);

		for (let i = 0; i < history.length; i++) {
			const slice = history.slice(0, i + 1);
			const context = slice.map((m) => prepareContent(client, m));

			brain.train(context, cleanContent);
		}

		if (
			history[0]?.author?.id === client.user.id ||
			message.content.startsWith(client.user.toString())
		) {
			message.reply({
				content: brain.answer(
					cleanContent,
					history.map((m) => prepareContent(client, m))
				),
			});
		}
	}
);
