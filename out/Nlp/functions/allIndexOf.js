"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allIndexOf(array, value) {
    const indexes = [];
    let index = array.indexOf(value, 0);
    while (index > -1) {
        indexes.push(index);
        index = array.indexOf(value, index + 1);
    }
    return indexes;
}
exports.default = allIndexOf;
