"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autoCorrect_1 = __importDefault(require("./autoCorrect"));
function noDiacritic(txt) {
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function tokenize(text, options) {
    var _a, _b, _c;
    const result = [];
    let str = "";
    let punc = "";
    let isUrl = false;
    options = {
        lowerCase: (_a = options === null || options === void 0 ? void 0 : options.lowerCase) !== null && _a !== void 0 ? _a : false,
        removePunctuation: (_b = options === null || options === void 0 ? void 0 : options.removePunctuation) !== null && _b !== void 0 ? _b : false,
        autoCorrectDataset: (_c = options === null || options === void 0 ? void 0 : options.autoCorrectDataset) !== null && _c !== void 0 ? _c : null,
    };
    if (options.lowerCase)
        text = text.toLowerCase();
    noDiacritic(text)
        .split("")
        .forEach((char, index) => {
        var _a;
        if (/^[.,:;!?'-]$/.test(char) || (isUrl && char === "/")) {
            if (str === "https" || isUrl) {
                isUrl = true;
                str += char;
                return;
            }
            if (/^[.-]$/.test(char) &&
                /^[a-zA-Zà-üÀ-Ü0-9{}()[\]<>]$/.test((_a = text[index + 1]) !== null && _a !== void 0 ? _a : "")) {
                if (punc !== "" && !options.removePunctuation) {
                    result.push(punc);
                    punc = "";
                }
                str += char;
            }
            else {
                if (str !== "") {
                    result.push(str);
                    str = "";
                }
                punc += char;
            }
        }
        else if (/^[a-zA-Zà-üÀ-Ü0-9{}()[\]<>]$/.test(char)) {
            if (punc !== "" && !options.removePunctuation) {
                result.push(punc);
                punc = "";
            }
            str += char;
        }
        else if (str !== "") {
            result.push(str);
            str = "";
            isUrl = false;
        }
    });
    if (str !== "")
        result.push(str);
    if (punc !== "" && !options.removePunctuation)
        result.push(punc);
    if (options.autoCorrectDataset !== null) {
        return result.map((token) => {
            if (/^[.,:;!?]+$/.test(token))
                return token;
            return (0, autoCorrect_1.default)(options.autoCorrectDataset, token);
        });
    }
    return result;
}
exports.default = tokenize;
