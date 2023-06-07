"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Client extends discord_js_1.default.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.default.IntentsBitField.Flags.Guilds,
                discord_js_1.default.IntentsBitField.Flags.GuildMessages,
                discord_js_1.default.IntentsBitField.Flags.MessageContent,
            ],
        });
    }
    loadEvents() {
        const eventFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, "../events"));
        eventFiles.forEach((file) => __awaiter(this, void 0, void 0, function* () {
            const { default: event } = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, "../events", file))));
            this.on(event.eventName, (...args) => event.eventCallback(this, ...args));
        }));
    }
    start(token) {
        this.loadEvents();
        this.login(token);
    }
}
exports.default = Client;
