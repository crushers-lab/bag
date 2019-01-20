"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MatrixUtils_1 = __importDefault(require("./MatrixUtils"));
function replaceNaN() {
    return function (_target, _propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        // tslint:disable-next-line
        descriptor.value = function () {
            var matrix = originalMethod.apply(MatrixUtils_1.default, arguments);
            return MatrixUtils_1.default.replaceNaN(matrix, 0);
        };
        return descriptor;
    };
}
exports.replaceNaN = replaceNaN;
