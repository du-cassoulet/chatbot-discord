import Discord from "discord.js";
import Event from "../classes/Event";

export default new Event(Discord.Events.ClientReady, (client) => {
	console.log(`Logged as ${client?.user?.tag}`);
});
