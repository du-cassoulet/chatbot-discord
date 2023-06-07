"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    constructor(eventName, eventCallback) {
        this.eventName = eventName;
        this.eventCallback = eventCallback;
    }
}
exports.default = Event;
