"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lemmatize = exports.alterate = exports.tokenize = exports.sentencize = exports.removeStopwords = exports.nextTokens = exports.jaroWinkler = exports.getSentiment = exports.autoCorrect = exports.allIndexOf = exports.Nlu = exports.Nlg = exports.Brain = void 0;
const Brain_1 = __importDefault(require("./classes/Brain"));
const Nlg_1 = __importDefault(require("./classes/Nlg"));
const Nlu_1 = __importDefault(require("./classes/Nlu"));
const allIndexOf_1 = __importDefault(require("./functions/allIndexOf"));
const autoCorrect_1 = __importDefault(require("./functions/autoCorrect"));
const getSentiment_1 = __importDefault(require("./functions/getSentiment"));
const jaroWinkler_1 = __importDefault(require("./functions/jaroWinkler"));
const nextTokens_1 = __importDefault(require("./functions/nextTokens"));
const removeStopwords_1 = __importDefault(require("./functions/removeStopwords"));
const sentencize_1 = __importDefault(require("./functions/sentencize"));
const tokenize_1 = __importDefault(require("./functions/tokenize"));
const alterate_1 = __importDefault(require("./functions/alterate"));
const lemmatize_1 = __importDefault(require("./functions/lemmatize"));
exports.Brain = Brain_1.default;
exports.Nlg = Nlg_1.default;
exports.Nlu = Nlu_1.default;
exports.allIndexOf = allIndexOf_1.default;
exports.autoCorrect = autoCorrect_1.default;
exports.getSentiment = getSentiment_1.default;
exports.jaroWinkler = jaroWinkler_1.default;
exports.nextTokens = nextTokens_1.default;
exports.removeStopwords = removeStopwords_1.default;
exports.sentencize = sentencize_1.default;
exports.tokenize = tokenize_1.default;
exports.alterate = alterate_1.default;
exports.lemmatize = lemmatize_1.default;
exports.default = {
    Brain: exports.Brain,
    Nlu: exports.Nlu,
    Nlg: exports.Nlg,
    allIndexOf: exports.allIndexOf,
    autoCorrect: exports.autoCorrect,
    getSentiment: exports.getSentiment,
    jaroWinkler: exports.jaroWinkler,
    nextTokens: exports.nextTokens,
    removeStopwords: exports.removeStopwords,
    sentencize: exports.sentencize,
    tokenize: exports.tokenize,
    alterate: exports.alterate,
    lemmatize: exports.lemmatize,
};
