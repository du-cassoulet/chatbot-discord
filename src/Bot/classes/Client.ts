import Discord from "discord.js";
import fs from "fs";
import path from "path";
import Event from "./Event";

export default class Client extends Discord.Client {
	constructor() {
		super({
			intents: [
				Discord.IntentsBitField.Flags.Guilds,
				Discord.IntentsBitField.Flags.GuildMessages,
				Discord.IntentsBitField.Flags.MessageContent,
			],
		});
	}

	private loadEvents() {
		const eventFiles = fs.readdirSync(path.join(__dirname, "../events"));

		eventFiles.forEach(async (file) => {
			const { default: event }: { default: Event } = await import(
				path.join(__dirname, "../events", file)
			);

			this.on(event.eventName, (...args) => event.eventCallback(this, ...args));
		});
	}

	public start(token: string | undefined) {
		this.loadEvents();
		this.login(token);
	}
}
