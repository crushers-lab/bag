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
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../Collection");
var exceptions_1 = require("../exceptions");
/**
 * @class Implementation of Queue data structure
 * @example
 * ```typescript
 *
 * const queue = new Queue<number>();
 * queue.enqueue(1,2,3,4,5,6);
 * const ele = queue.dequeue();
 * // It returns the iterator instance of queue
 * const it = queue.getIterator();
 * while(it.hasNext())
 * {
 *     console.log(it.next());  // 2 3 4 5 6
 * }
 * while(it.hasPrev())
 * {
 *     console.log(it.prev());  // 6 5 4 3 2
 * }
 * ```
 */
var Queue = /** @class */ (function (_super) {
    __extends(Queue, _super);
    /**
     * @param size  Size of the queue.
     * Queue is dynamic it grows so no need to take care of size
     */
    function Queue(size) {
        if (size === void 0) { size = Queue.DEFAULT_SIZE; }
        var _this = _super.call(this) || this;
        /**
         * To store the right index
         */
        _this._right = -1;
        /**
         * To store the left index
         */
        _this._left = 0;
        _this._queue = size === 0 ? [] : new Array(size);
        _this._size = size;
        return _this;
    }
    /**
     * @returns returns from front of queue
     * @throws EmptyCollectionException if there are no elements in array
     */
    Queue.prototype.dequeue = function () {
        if (this._left > this._right) {
            if (this._right > -1) {
                this.clear();
            }
            throw new exceptions_1.EmptyCollectionException();
        }
        return this._queue[this._left++];
    };
    /**
     * @param items add elements in back of queue
     */
    Queue.prototype.enqueue = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (this._left > Queue.MAX_EMPTY) {
            this.copyToBeginning();
        }
        items.forEach(function (item) {
            _this._queue[++_this._right] = item;
        });
        return this.size();
    };
    /**
     * Reset array
     */
    Queue.prototype.clear = function () {
        this._queue = this._size === 0 ? [] : new Array(this._size);
        this._right = -1;
        this._left = 0;
    };
    /**
     * @returns Returns size of queue
     */
    Queue.prototype.size = function () {
        return this._right - this._left + 1;
    };
    /**
     * @returns {Type[]} returns collection in array format
     */
    Queue.prototype.entries = function () {
        if (this.size() === 0) {
            return [];
        }
        return this._queue.slice(this._left, this._right + 1);
    };
    /**
     * @returns {Queue<Type>} Clone the Queue
     */
    Queue.prototype.clone = function () {
        var queue = new Queue(this._size);
        queue._left = this._left;
        queue._right = this._right;
        queue._queue = __spread(this._queue);
        return queue;
    };
    /**
     * Removes unused elements and resets the values to front
     */
    Queue.prototype.copyToBeginning = function () {
        var queue = this.entries();
        var size = this.size();
        for (var i = 0; i < size; i++) {
            this._queue[i] = queue[i];
        }
        this._left = 0;
        this._right = size;
    };
    /**
     * Max empty values that are allowed after that _queue will be re constructed
     */
    Queue.MAX_EMPTY = 1000;
    /**
     * Default size of queue
     */
    Queue.DEFAULT_SIZE = 10;
    return Queue;
}(Collection_1.AbstractCollection));
exports.default = Queue;
