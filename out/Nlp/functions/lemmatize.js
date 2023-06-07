"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.lem = exports.expandMode = void 0;
const fs_1 = __importDefault(require("fs"));
const lemmatizer = JSON.parse(fs_1.default.readFileSync("./data/lemmatizer.json", "utf8"));
function expandMode(mode) {
    return {
        indicatif: /[PFIJ]/.test(mode),
        subjonctif: /[ST]/.test(mode),
        participe: /[KG]/.test(mode),
        present: /[PCYSGW]/.test(mode),
        imparfait: /[IT]/.test(mode),
        conditionnel: /C/.test(mode),
        imperatif: /Y/.test(mode),
        infinitif: /W/.test(mode),
        futur: /F/.test(mode),
        passeSimple: /J/.test(mode),
        passe: /K/.test(mode),
        premierePersonne: /1/.test(mode),
        deuxiemePersonne: /2/.test(mode),
        troisiemePersonne: /3/.test(mode),
        masculin: /m/.test(mode),
        feminin: /f/.test(mode),
        singulier: /s/.test(mode),
        pluriel: /p/.test(mode),
    };
}
exports.expandMode = expandMode;
function lem(word, type) {
    var _a, _b, _c, _d, _e;
    if (!type) {
        return (_c = (_b = (_a = lemmatizer[word]) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.lemma) !== null && _c !== void 0 ? _c : word;
    }
    return (_e = (_d = lemmatizer[word].find((l) => l.type === type)) === null || _d === void 0 ? void 0 : _d.lemma) !== null && _e !== void 0 ? _e : word;
}
exports.lem = lem;
function info(word) {
    var _a;
    return (_a = lemmatizer[word]) !== null && _a !== void 0 ? _a : [{ type: "np", lemma: word, mode: "ms" }];
}
exports.info = info;
exports.default = { lem, info, expandMode };
