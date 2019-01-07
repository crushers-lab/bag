import IIterator from "./IIterator";
import OutOfBoundsException from "../exceptions/OutOfBounds";
import ICollection from "./ICollection";
import EmptyCollectionException from "../exceptions/EmptyCollection";

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
class Iterator<Type> implements IIterator<Type> {
    private readonly _data: Type[];
    private readonly _length: number;
    private _index: number = 0;
    private _current: Type | undefined = undefined;

    /**
     * @constructor Takes collection to make a iterable
     * @param collection
     */
    constructor(collection: ICollection<Type>) {
        this._data = collection.entries();
        this._length = collection.size();
    }

    /**
     * @property specifies the length of iterable
     */
    public get length() {
        return this._length;
    }

    /**
     * @property current index of iterable
     */
    public get index() {
        return this._index;
    }

    /**
     * @property to access the current element in iterable
     */
    public get current() {
        return this._current;
    }

    /**
     * @function To check if next element is available
     * @returns {boolean}
     */
    hasNext(): boolean {
        return this.index < this.length;
    }

    /**
     * @function To check if prev element is available
     * @returns {boolean}
     */
    hasPrev(): boolean {
        return this.index > 0;
    }

    /**
     * @function get next element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no next element available
     * @returns {Type} next element in the iterable
     */
    next(): Type {
        if (this.length === 0) {
            throw new EmptyCollectionException();
        }
        if (!this.hasNext()) {
            throw new OutOfBoundsException();
        }
        return this._current = this._data[this._index++];
    }

    /**
     * @function get prev element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no prev element available
     * @returns {Type} prev element in the iterable
     */
    prev(): Type {
        if (this.length === 0) {
            throw new EmptyCollectionException();
        }
        if (!this.hasPrev()) {
            throw new OutOfBoundsException();
        }
        return this._current = this._data[--this._index];
    }

    /**
     * @function reset the iterable to first position
     */
    reset(): void {
        this._index = 0;
    }

}

export default Iterator;
