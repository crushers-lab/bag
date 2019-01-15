"use strict";
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
var Matrix_1 = __importDefault(require("./Matrix"));
var MatrixUtils = /** @class */ (function () {
    function MatrixUtils() {
    }
    MatrixUtils.transpose = function (matrix) {
        var tp = [];
        var _a = __read(Matrix_1.default.getOrder(matrix), 2), m = _a[0], n = _a[1];
        for (var i = 0; i < n; i++) {
            tp[i] = [];
            for (var j = 0; j < m; j++) {
                tp[i][j] = matrix[j][i];
            }
        }
        return tp;
    };
    MatrixUtils.inverse = function (matrix) {
        var _a = __read(Matrix_1.default.getOrder(matrix), 2), m = _a[0], n = _a[1];
        if (m !== n) {
            throw new Error("Not a square matrix");
        }
        var id = this.identity(n);
        var adj = this.concat(matrix, id);
        var n2 = 2 * n;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (i !== j) {
                    var ratio = adj[j][i] / adj[i][i];
                    for (var k = 0; k < n2; k++) {
                        adj[j][k] -= ratio * adj[i][k];
                    }
                }
            }
        }
        var count = 0;
        for (var i = 0; i < n; i++) {
            if (adj[n - 1][i] === 0) {
                count++;
            }
        }
        if (count === n) {
            throw new Error("Cannot find inverse of matrix");
        }
        for (var i = 0; i < n; i++) {
            var a = adj[i][i];
            for (var j = 0; j < n2; j++) {
                adj[i][j] /= a;
            }
        }
        return this.extract(adj, 0, n, n, n);
    };
    MatrixUtils.extract = function (matrix, mStart, nStart, mStop, nStop) {
        if (nStart === void 0) { nStart = mStart; }
        if (mStop === void 0) { mStop = 0; }
        if (nStop === void 0) { nStop = 0; }
        return matrix
            .slice(mStart, mStart + mStop)
            .map(function (vector) { return vector.slice(nStart, nStart + nStop); });
    };
    MatrixUtils.concat = function (a, b) {
        var _a = __read(Matrix_1.default.getOrder(a), 2), m = _a[0], n = _a[1];
        var _b = __read(Matrix_1.default.getOrder(b), 2), p = _b[0], q = _b[1];
        if (m !== p || n !== q) {
            throw new Error("Order should be same for concat");
        }
        return a.map(function (vector, index) { return __spread(vector, b[index]); });
    };
    MatrixUtils.multiply = function (a, b) {
        var _a = __read(Matrix_1.default.getOrder(a), 2), m = _a[0], n = _a[1];
        var _b = __read(Matrix_1.default.getOrder(b), 2), p = _b[0], q = _b[1];
        if (n !== p) {
            throw new Error("n is not equal to p. Not able to multiply");
        }
        var c = this.fill(m, q, 0);
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < q; j++) {
                for (var k = 0; k < n; ++k) {
                    c[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return c;
    };
    MatrixUtils.fill = function (m, n, num) {
        var matrix = [];
        for (var i = 0; i < m; i++) {
            matrix[i] = [];
            for (var j = 0; j < n; j++) {
                matrix[i][j] = num;
            }
        }
        return matrix;
    };
    MatrixUtils.identity = function (n) {
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix[i] = [];
            for (var j = 0; j < n; j++) {
                matrix[i][j] = (i === j) ? 1 : 0;
            }
        }
        return matrix;
    };
    return MatrixUtils;
}());
exports.default = MatrixUtils;
