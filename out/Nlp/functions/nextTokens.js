"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allIndexOf_1 = __importDefault(require("./allIndexOf"));
const autoCorrect_1 = __importDefault(require("./autoCorrect"));
const tokenize_1 = __importDefault(require("./tokenize"));
function nextTokens(dataset, tokens, slice = 3) {
    tokens = tokens.slice(-slice);
    const valids = tokens.map((word) => (0, autoCorrect_1.default)(dataset.map((words) => (0, tokenize_1.default)(words)).flat(), word, 0));
    function inspect(i = tokens.length) {
        let ends = 0;
        const next = {};
        dataset.forEach((words) => {
            const tokens = (0, tokenize_1.default)(words);
            const groups = [];
            for (let j = 0; j < tokens.length; j++) {
                groups.push(tokens.slice(j, j + i).join(" "));
            }
            const indexes = (0, allIndexOf_1.default)(groups, valids.join(" "));
            indexes.forEach((index) => {
                var _a;
                const word = (_a = tokens[index + i]) !== null && _a !== void 0 ? _a : null;
                if (word === null) {
                    ends += 1;
                }
                else if (next[word]) {
                    next[word] += 1;
                }
                else {
                    next[word] = 1;
                }
            });
        });
        if (Object.keys(next).length <= 0 && ends <= 0 && i > 0) {
            return inspect(i - 1);
        }
        const probabilities = [];
        const sum = Object.values(next).reduce((acc, val) => acc + val, 0) + ends;
        if (ends > 0) {
            probabilities.push({
                word: null,
                probability: ends / sum,
            });
        }
        Object.entries(next).map(([word, value]) => {
            probabilities.push({
                word,
                probability: value / sum,
            });
        });
        return probabilities.sort((a, b) => b.probability - a.probability);
    }
    const next = inspect();
    return next;
}
exports.default = nextTokens;
