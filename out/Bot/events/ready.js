"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const Event_1 = __importDefault(require("../classes/Event"));
exports.default = new Event_1.default(discord_js_1.default.Events.ClientReady, (client) => {
    var _a;
    console.log(`Logged as ${(_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
