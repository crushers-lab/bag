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
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../Collection");
var ICloneable_1 = require("../Collection/ICloneable");
var exceptions_1 = require("../exceptions");
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super.call(this) || this;
        /**
         * Points to top of stack
         */
        _this._top = -1;
        _this._stack = [];
        return _this;
    }
    Stack.prototype.clear = function () {
        this._top = -1;
        this._stack = [];
    };
    Stack.prototype.clone = function () {
        var stack = new Stack();
        stack._stack = this._stack.map(function (value) { return ICloneable_1.clone(value); });
        stack._top = this._top;
        return stack;
    };
    Stack.prototype.entries = function () {
        if (this._top === -1) {
            return [];
        }
        return this._stack.slice(0, this.size());
    };
    Stack.prototype.pop = function () {
        this._assertStack();
        return this._stack[this._top--];
    };
    Stack.prototype.push = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) {
            _this._stack[++_this._top] = item;
        });
        return this.size();
    };
    Stack.prototype.size = function () {
        return this._top + 1;
    };
    /**
     * @function Assert stack is not empty
     * @throws {EmptyCollectionException} if stack is empty
     * @private
     */
    Stack.prototype._assertStack = function () {
        if (this.isEmpty()) {
            throw new exceptions_1.EmptyCollectionException();
        }
    };
    return Stack;
}(Collection_1.AbstractCollection));
exports.default = Stack;
