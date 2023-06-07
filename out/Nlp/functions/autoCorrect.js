"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jaroWinkler_1 = __importDefault(require("./jaroWinkler"));
function autoCorrect(dataset, word, tolerance = 0.95) {
    let selected = word;
    let score = 0;
    dataset.forEach((w) => {
        const s = (0, jaroWinkler_1.default)(word, w);
        if (s > Math.max(score, tolerance)) {
            score = s;
            selected = w;
        }
    });
    if (word.toLowerCase() === selected.toLowerCase())
        return word;
    return selected;
}
exports.default = autoCorrect;
