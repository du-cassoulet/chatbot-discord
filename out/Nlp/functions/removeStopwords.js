"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const stopwords = JSON.parse(fs_1.default.readFileSync("./data/stopwords.json", "utf8"));
function removeStopwords(tokens) {
    return tokens.filter((token) => !stopwords.includes(token.toLowerCase()) && !/^[.,:;!?]+$/.test(token));
}
exports.default = removeStopwords;
