import Discord from "discord.js";
import Client from "./Client";

type EventCallback = (client: Client, ...args: any[]) => any;
type EventName = keyof Discord.ClientEvents;

export default class Event {
	public eventName: EventName;
	public eventCallback: EventCallback;

	constructor(eventName: EventName, eventCallback: EventCallback) {
		this.eventName = eventName;
		this.eventCallback = eventCallback;
	}
}
