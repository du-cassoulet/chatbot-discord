"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const synonymsList = JSON.parse(fs_1.default.readFileSync("./data/synonyms.json", "utf-8"));
function noCaseNoDiacritic(txt) {
    return txt
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
function alterate(tokens, alterationLevel = 0.5) {
    var _a;
    const newTokens = [];
    for (let i = 0; i < tokens.length; i++) {
        const defaultToken = noCaseNoDiacritic(tokens[i]);
        const synonyms = (_a = synonymsList[defaultToken]) === null || _a === void 0 ? void 0 : _a.synonyms;
        if (Math.random() < alterationLevel && synonyms) {
            const synonym = synonyms[Math.floor(Math.random() * synonyms.length)];
            newTokens.push(synonym);
        }
        else {
            newTokens.push(defaultToken);
        }
    }
    return newTokens;
}
exports.default = alterate;
