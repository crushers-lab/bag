"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../exceptions");
/**
 * @class Generic iterator
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
var Iterator = /** @class */ (function () {
    /**
     * @constructor Takes collection to make a iterable
     * @param collection
     */
    function Iterator(collection) {
        this._index = 0;
        this._current = undefined;
        this._data = collection.entries();
        this._length = collection.size();
    }
    Object.defineProperty(Iterator.prototype, "length", {
        /**
         * @property specifies the length of iterable
         */
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iterator.prototype, "index", {
        /**
         * @property current index of iterable
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Iterator.prototype, "current", {
        /**
         * @property to access the current element in iterable
         */
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @function To check if next element is available
     * @returns {boolean}
     */
    Iterator.prototype.hasNext = function () {
        return this.index < this.length;
    };
    /**
     * @function To check if prev element is available
     * @returns {boolean}
     */
    Iterator.prototype.hasPrev = function () {
        return this.index > 0;
    };
    /**
     * @function get next element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no next element available
     * @returns {Type} next element in the iterable
     */
    Iterator.prototype.next = function () {
        this._assertNotEmpty();
        if (!this.hasNext()) {
            throw new exceptions_1.OutOfBoundsException();
        }
        return this._current = this._data[this._index++];
    };
    /**
     * @function get prev element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no prev element available
     * @returns {Type} prev element in the iterable
     */
    Iterator.prototype.prev = function () {
        this._assertNotEmpty();
        if (!this.hasPrev()) {
            throw new exceptions_1.OutOfBoundsException();
        }
        return this._current = this._data[--this._index];
    };
    /**
     * @function reset the iterable to first position
     */
    Iterator.prototype.reset = function () {
        this._index = 0;
    };
    /**
     * @function move to end of collection
     */
    Iterator.prototype.end = function () {
        this._assertNotEmpty();
        this._index = this.length;
        this._current = this._data[this._index - 1];
    };
    /**
     * @function move to beginning of collection
     */
    Iterator.prototype.start = function () {
        this._assertNotEmpty();
        this._index = 0;
        this._current = this._data[0];
    };
    Iterator.prototype._assertNotEmpty = function () {
        if (this.length === 0) {
            throw new exceptions_1.EmptyCollectionException();
        }
    };
    return Iterator;
}());
exports.default = Iterator;
