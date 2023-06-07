"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const Event_1 = __importDefault(require("../classes/Event"));
const Nlp_1 = __importDefault(require("../../Nlp"));
const MEMORY = 3;
const brain = new Nlp_1.default.Brain();
function fetchConversation(message, number) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reference = yield message.fetchReference();
            if (number <= 1)
                return [reference];
            return [reference, ...(yield fetchConversation(reference, number - 1))];
        }
        catch (_a) {
            return [];
        }
    });
}
function prepareContent(client, message) {
    let content = message.cleanContent;
    if (message.content.startsWith(client.user.toString())) {
        content = content.slice(client.user.username.length + 1);
    }
    content = content.replace(/<:[a-zA-Z_]{2,}:\d+>/g, "");
    content = content.replace(/\s{2,}/g, " ");
    return content.trim();
}
exports.default = new Event_1.default(discord_js_1.default.Events.MessageCreate, (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (message.author.bot || !message.guild)
        return;
    const cleanContent = prepareContent(client, message);
    const history = yield fetchConversation(message, MEMORY);
    for (let i = 0; i < history.length; i++) {
        const slice = history.slice(0, i + 1);
        const context = slice
            .filter((m) => m.author.id !== client.user.id)
            .map((m) => prepareContent(client, m));
        brain.train(context, cleanContent);
    }
    if (((_b = (_a = history[0]) === null || _a === void 0 ? void 0 : _a.author) === null || _b === void 0 ? void 0 : _b.id) === client.user.id ||
        message.content.startsWith(client.user.toString())) {
        message.reply({
            content: brain.answer(cleanContent, history.map((m) => prepareContent(client, m))),
        });
    }
}));
