"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tokenize_1 = __importDefault(require("../functions/tokenize"));
const nextTokens_1 = __importDefault(require("../functions/nextTokens"));
const sentencize_1 = __importDefault(require("../functions/sentencize"));
const alterate_1 = __importDefault(require("../functions/alterate"));
const words = JSON.parse(fs_1.default.readFileSync("./data/words.json", "utf8"));
class Nlg {
    constructor(dataset) {
        this.dataset = dataset;
    }
    continue(text, options) {
        var _a, _b, _c;
        options = {
            dataSlice: (_a = options === null || options === void 0 ? void 0 : options.dataSlice) !== null && _a !== void 0 ? _a : Nlg.Constants.DEFAULT_DATA_SLICE,
            alterateValue: (_b = options === null || options === void 0 ? void 0 : options.alterateValue) !== null && _b !== void 0 ? _b : Nlg.Constants.DEFAULT_ALTERATE_VALUE,
            autoCorrect: (_c = options === null || options === void 0 ? void 0 : options.autoCorrect) !== null && _c !== void 0 ? _c : true,
        };
        const tokenizeOptions = {};
        if (options.autoCorrect)
            tokenizeOptions.autoCorrectDataset = words;
        const tokens = (0, tokenize_1.default)(text, tokenizeOptions);
        let [token] = tokens;
        while (token !== null) {
            const predictions = (0, nextTokens_1.default)(this.dataset, tokens, options.dataSlice);
            const random = Math.random();
            let scale = 0;
            token = null;
            for (const prediction of predictions) {
                if (random < prediction.probability + scale) {
                    token = prediction.word;
                    break;
                }
                scale += prediction.probability;
            }
            if (token !== null)
                tokens.push(token);
        }
        return (0, sentencize_1.default)((0, alterate_1.default)(tokens, options.alterateValue));
    }
}
exports.default = Nlg;
Nlg.Constants = {
    DEFAULT_DATA_SLICE: 3,
    DEFAULT_ALTERATE_VALUE: 0.8,
};
