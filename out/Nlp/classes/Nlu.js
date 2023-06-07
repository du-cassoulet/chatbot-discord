"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const lemmatize_1 = require("../functions/lemmatize");
const tokenize_1 = __importDefault(require("../functions/tokenize"));
const words = JSON.parse(fs_1.default.readFileSync("./data/words.json", "utf8"));
class Nlu {
    constructor() { }
    lemmatize(text, removePuncuation) {
        const tokens = (0, tokenize_1.default)(text, {
            lowerCase: true,
            autoCorrectDataset: words,
        });
        let lastType = null;
        const lemmas = tokens.map((token) => {
            var _a;
            const tokenInfo = (0, lemmatize_1.info)(token);
            let [selectedToken] = tokenInfo;
            if (/(?:cl[adnr])|(?:np)/.test(lastType)) {
                selectedToken = (_a = tokenInfo.find((ti) => ti.type === "v")) !== null && _a !== void 0 ? _a : tokenInfo[0];
            }
            lastType = selectedToken.type;
            return selectedToken.lemma;
        });
        if (removePuncuation) {
            return lemmas.filter((lemma) => !/^[.,:;!?]+$/.test(lemma));
        }
        return lemmas;
    }
}
exports.default = Nlu;
