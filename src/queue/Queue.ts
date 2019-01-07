import IQueue from "./IQueue";
import EmptyCollectionException from "../exceptions/EmptyCollection";
import {AbstractCollection} from "../Collection";

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
class Queue<Type> extends AbstractCollection<Type> implements IQueue<Type> {

    /**
     * To store the elements in array
     */
    private _queue: Type[];

    /**
     * Size of initial buffer array specified
     */
    private readonly _size: number;

    /**
     * To store the right index
     */
    private _right: number = -1;

    /**
     * To store the left index
     */
    private _left: number = 0;

    /**
     * Max empty values that are allowed after that _queue will be re constructed
     */
    public static MAX_EMPTY: number = 1000;

    /**
     * Default size of queue
     */
    public static DEFAULT_SIZE: number = 10;

    /**
     * @param size  Size of the queue.
     * Queue is dynamic it grows so no need to take care of size
     */
    constructor(size: number = Queue.DEFAULT_SIZE) {
        super();
        this._queue = size === 0 ? [] : new Array(size);
        this._size = size;
    }

    /**
     * @returns returns from front of queue
     * @throws EmptyCollectionException if there are no elements in array
     */
    public dequeue(): Type {
        if (this._left > this._right) {
            if (this._right > -1) {
                this.clear();
            }
            throw new EmptyCollectionException();
        }
        return this._queue[this._left++];
    }

    /**
     * @param items add elements in back of queue
     */
    public enqueue(...items: Type[]): number {
        if (this._left > Queue.MAX_EMPTY) {
            this.copyToBeginning();
        }
        items.forEach((item) => {
            this._queue[++this._right] = item;
        });
        return this.size();
    }

    /**
     * Removes unused elements and resets the values to front
     */
    private copyToBeginning() {
        const queue: Type[] = this.entries();
        const size = this.size();
        for (let i = 0; i < size; i++) {
            this._queue[i] = queue[i];
        }
        this._left = 0;
        this._right = size;
    }

    /**
     * Reset array
     */
    public clear(): void {
        this._queue = this._size === 0 ? [] : new Array(this._size);
        this._right = -1;
        this._left = 0;
    }

    /**
     * @returns Returns size of queue
     */
    public size(): number {
        return this._right - this._left + 1;
    }

    /**
     * @returns {Type[]} returns collection in array format
     */
    public entries(): Type[] {
        if (this.size() === 0) {
            return [];
        }
        return this._queue.slice(this._left, this._right + 1);
    }

    /**
     * @returns {Queue<Type>} Clone the Queue
     */
    public clone(): Queue<Type> {
        const queue = new Queue<Type>(this._size);
        queue._left = this._left;
        queue._right = this._right;
        queue._queue = [...this._queue];
        return queue;
    }
}

export default Queue;
