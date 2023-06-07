"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sentiments = void 0;
const fs_1 = __importDefault(require("fs"));
const tokenize_1 = __importDefault(require("./tokenize"));
const sentencize_1 = __importDefault(require("./sentencize"));
const words = JSON.parse(fs_1.default.readFileSync("./data/words.json", "utf8"));
const sentiments = JSON.parse(fs_1.default.readFileSync("./data/sentiments.json", "utf8"));
function noCaseNoDiacritic(txt) {
    return txt
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
exports.Sentiments = Object.freeze({
    POSITIVE: "positive",
    NEUTRAL: "neutral",
    NEGATIVE: "negative",
});
function getSentiment(text) {
    const tokens = (0, tokenize_1.default)(noCaseNoDiacritic(text), {
        lowerCase: true,
        autoCorrectDataset: words,
        removePunctuation: true,
    });
    const corrected = (0, sentencize_1.default)(tokens);
    const calculation = [];
    const positives = [];
    const negatives = [];
    let score = 0;
    sentiments.forEach((label) => {
        [
            ...corrected.matchAll(new RegExp("\\b" + label.word + "\\b", "g")),
        ].forEach(() => {
            calculation.push(label.score);
            score += label.score;
            if (label.score > 0)
                positives.push(label.word);
            if (label.score < 0)
                negatives.push(label.word);
        });
    });
    return {
        score,
        comparative: tokens.length > 0 ? score / tokens.length : 0,
        positives,
        negatives,
        sentiment: score === 0
            ? exports.Sentiments.NEUTRAL
            : score > 0
                ? exports.Sentiments.POSITIVE
                : exports.Sentiments.NEGATIVE,
    };
}
exports.default = getSentiment;
