"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCloneable(value) {
    return value.clone !== undefined;
}
exports.isCloneable = isCloneable;
function clone(value) {
    return value ? (isCloneable(value) ? value.clone() : value) : value;
}
exports.clone = clone;
