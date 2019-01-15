"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EmptyCollection_1 = __importDefault(require("./EmptyCollection"));
exports.EmptyCollectionException = EmptyCollection_1.default;
var NaNException_1 = __importDefault(require("./NaNException"));
exports.NaNException = NaNException_1.default;
var NotFound_1 = __importDefault(require("./NotFound"));
exports.NotFoundException = NotFound_1.default;
var OutOfBounds_1 = __importDefault(require("./OutOfBounds"));
exports.OutOfBoundsException = OutOfBounds_1.default;
