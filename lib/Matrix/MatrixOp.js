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
var lodash_1 = __importDefault(require("lodash"));
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
    MatrixOp.getValue = function (matrix) {
        return lodash_1.default.isNumber(matrix) ? matrix : matrix.matrix;
    };
    MatrixOp.prototype.inverse = function () {
        return new MatrixOp(MatrixUtils_1.default.inverse(this.matrix));
    };
    MatrixOp.prototype.inverseInPlace = function () {
        this.matrix = this.inverse().matrix;
        return this;
    };
    MatrixOp.prototype.multiply = function (matrix) {
        return new MatrixOp(MatrixUtils_1.default.multiply(this.matrix, MatrixOp.getValue(matrix)));
    };
    MatrixOp.prototype.multiplyInPlace = function (matrix) {
        this.matrix = this.multiply(matrix).matrix;
        return this;
    };
    MatrixOp.prototype.add = function (matrix) {
        return new MatrixOp(MatrixUtils_1.default.add(this.matrix, MatrixOp.getValue(matrix)));
    };
    MatrixOp.prototype.addInPlace = function (matrix) {
        this.matrix = this.add(matrix).matrix;
        return this;
    };
    MatrixOp.prototype.sub = function (matrix) {
        return new MatrixOp(MatrixUtils_1.default.sub(this.matrix, MatrixOp.getValue(matrix)));
    };
    MatrixOp.prototype.subInPlace = function (matrix) {
        this.matrix = this.sub(matrix).matrix;
        return this;
    };
    MatrixOp.prototype.divide = function (value) {
        return new MatrixOp(MatrixUtils_1.default.divide(this.matrix, value));
    };
    MatrixOp.prototype.divideInPlace = function (value) {
        this.matrix = this.divide(value).matrix;
        return this;
    };
    MatrixOp.prototype.transpose = function () {
        return new MatrixOp(_super.prototype.transpose.call(this).matrix);
    };
    MatrixOp.prototype.transposeInPlace = function () {
        _super.prototype.transposeInPlace.call(this);
        return this;
    };
    MatrixOp.prototype.extract = function (mStart, nStart, mStop, nStop) {
        return new MatrixOp(_super.prototype.extract.call(this, mStart, nStart, mStop, nStop).matrix);
    };
    MatrixOp.prototype.extractInPlace = function (mStart, nStart, mStop, nStop) {
        _super.prototype.extractInPlace.call(this, mStart, nStart, mStop, nStop);
        return this;
    };
    MatrixOp.prototype.concat = function (matrix) {
        return new MatrixOp(_super.prototype.concat.call(this, matrix).matrix);
    };
    MatrixOp.prototype.concatInPlace = function (matrix) {
        _super.prototype.concatInPlace.call(this, matrix);
        return this;
    };
    MatrixOp.prototype.addColumn = function (value, index) {
        if (value === void 0) { value = 1; }
        if (index === void 0) { index = 0; }
        return new MatrixOp(MatrixUtils_1.default.addColumn(this.matrix, value, index));
    };
    MatrixOp.prototype.addColumnInPlace = function (value, index) {
        if (value === void 0) { value = 1; }
        if (index === void 0) { index = 0; }
        this.matrix = this.addColumn(value, index).matrix;
        return this;
    };
    MatrixOp.prototype.addRow = function (value, index) {
        if (value === void 0) { value = 1; }
        if (index === void 0) { index = 0; }
        return new MatrixOp(MatrixUtils_1.default.addColumn(this.matrix, value, index));
    };
    MatrixOp.prototype.addRowInPlace = function (value, index) {
        if (value === void 0) { value = 1; }
        if (index === void 0) { index = 0; }
        this.matrix = this.addRow(value, index).matrix;
        return this;
    };
    MatrixOp.prototype.clone = function () {
        return new MatrixOp(_super.prototype.clone.call(this).matrix);
    };
    return MatrixOp;
}(Matrix_1.default));
exports.default = MatrixOp;
