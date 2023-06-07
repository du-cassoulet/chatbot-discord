"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sentencize(tokens) {
    return tokens
        .join(" ")
        .replace(/\s(,|\.|:)/g, "$1")
        .replace(/\s('|-)\s/g, "$1");
}
exports.default = sentencize;
