"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __importDefault(require("./Matrix"));
var MatrixUtils_1 = __importDefault(require("./MatrixUtils"));
var MatrixOp = /** @class */ (function (_super) {
    __extends(MatrixOp, _super);
    function MatrixOp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatrixOp.identity = function (n) {
        return new MatrixOp(MatrixUtils_1.default.identity(n));
    };
    MatrixOp.fill = function (m, n, val) {
        return new MatrixOp(MatrixUtils_1.default.fill(m, n, val));
    };
    MatrixOp.prototype.inverse = function () {
        return new MatrixOp(MatrixUtils_1.default.inverse(this.matrix));
    };
    MatrixOp.prototype.inverseInPlace = function () {
        this.matrix = this.inverse().matrix;
        return this;
    };
    MatrixOp.prototype.multiply = function (matrix) {
        return new MatrixOp(MatrixUtils_1.default.multiply(this.matrix, matrix.matrix));
    };
    MatrixOp.prototype.multiplyInPlace = function (matrix) {
        this.matrix = this.multiply(matrix).matrix;
        return this;
    };
    MatrixOp.prototype.transpose = function () {
        return _super.prototype.transpose.call(this);
    };
    MatrixOp.prototype.transposeInPlace = function () {
        return _super.prototype.transposeInPlace.call(this);
    };
    MatrixOp.prototype.extract = function (mStart, nStart, mStop, nStop) {
        return _super.prototype.extract.call(this, mStart, nStart, mStop, nStop);
    };
    MatrixOp.prototype.extractInPlace = function (mStart, nStart, mStop, nStop) {
        return _super.prototype.extractInPlace.call(this, mStart, nStart, mStop, nStop);
    };
    MatrixOp.prototype.concat = function (matrix) {
        return _super.prototype.concat.call(this, matrix);
    };
    MatrixOp.prototype.concatInPlace = function (matrix) {
        return _super.prototype.concatInPlace.call(this, matrix);
    };
    MatrixOp.prototype.clone = function () {
        return _super.prototype.clone.call(this);
    };
    return MatrixOp;
}(Matrix_1.default));
exports.default = MatrixOp;
