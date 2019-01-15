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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCollection_1 = __importDefault(require("../Collection/AbstractCollection"));
var ICloneable_1 = require("../Collection/ICloneable");
var exceptions_1 = require("../exceptions");
var MatrixUtils_1 = __importDefault(require("./MatrixUtils"));
var Matrix = /** @class */ (function (_super) {
    __extends(Matrix, _super);
    function Matrix(matrix) {
        if (matrix === void 0) { matrix = [[]]; }
        var _this = _super.call(this) || this;
        _this._order = Matrix.getOrder(matrix);
        _this._matrix = matrix;
        return _this;
    }
    Object.defineProperty(Matrix.prototype, "m", {
        get: function () {
            return this._order[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "n", {
        get: function () {
            return this._order[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "matrix", {
        get: function () {
            return this._matrix;
        },
        set: function (matrix) {
            this._order = Matrix.getOrder(matrix);
            this._matrix = matrix;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.getOrder = function (matrix) {
        var m = matrix.length;
        var _a = __read(matrix, 1), row = _a[0];
        var n = row.length;
        return [m, n];
    };
    Matrix.fill = function (m, n, val) {
        return new Matrix(MatrixUtils_1.default.fill(m, n, val));
    };
    Matrix.concat = function (a, b) {
        return new Matrix(MatrixUtils_1.default.concat(a.matrix, b.matrix));
    };
    Matrix._cloneMatrix = function (matrix) {
        var _this = this;
        return matrix.map(function (vector) { return _this._cloneVector(vector); });
    };
    Matrix._cloneVector = function (vector) {
        return vector.map(function (value) { return ICloneable_1.clone(value); });
    };
    Matrix.prototype.set = function (ele, m, n) {
        this._assertBounds(m, n);
        this._matrix[m][n] = ele;
    };
    Matrix.prototype.get = function (m, n) {
        this._assertBounds(m, n);
        return this._matrix[m][n];
    };
    Matrix.prototype.clear = function () {
        this.matrix = [[]];
    };
    Matrix.prototype.clone = function () {
        return new Matrix(Matrix._cloneMatrix(this.matrix));
    };
    Matrix.prototype.entries = function () {
        return Matrix
            ._cloneMatrix(this.matrix)
            .reduce(function (acc, vector) { return __spread(acc, vector); }, []);
    };
    Matrix.prototype.size = function () {
        return this.m * this.n;
    };
    Matrix.prototype.transpose = function () {
        return new Matrix(MatrixUtils_1.default.transpose(this.matrix));
    };
    Matrix.prototype.transposeInPlace = function () {
        this.matrix = MatrixUtils_1.default.transpose(this.matrix);
        return this;
    };
    Matrix.prototype.extract = function (mStart, nStart, mStop, nStop) {
        return new Matrix(MatrixUtils_1.default.extract(this.matrix, mStart, nStart, mStop, nStop));
    };
    Matrix.prototype.extractInPlace = function (mStart, nStart, mStop, nStop) {
        this.matrix = this.extract(mStart, nStart, mStop, nStop).matrix;
        return this;
    };
    Matrix.prototype.concat = function (matrix) {
        return Matrix.concat(this, matrix);
    };
    Matrix.prototype.concatInPlace = function (matrix) {
        this.matrix = this.concat(matrix).matrix;
        return this;
    };
    Matrix.prototype._assertBounds = function (m, n) {
        if (m >= this.m || n >= this.n) {
            throw new exceptions_1.OutOfBoundsException();
        }
    };
    return Matrix;
}(AbstractCollection_1.default));
exports.default = Matrix;
