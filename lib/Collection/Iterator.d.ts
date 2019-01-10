import ICollection from "./ICollection";
import IIterator from "./IIterator";
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
declare class Iterator<Type> implements IIterator<Type> {
    /**
     * @property specifies the length of iterable
     */
    readonly length: number;
    /**
     * @property current index of iterable
     */
    readonly index: number;
    /**
     * @property to access the current element in iterable
     */
    readonly current: Type | undefined;
    private readonly _data;
    private readonly _length;
    private _index;
    private _current;
    /**
     * @constructor Takes collection to make a iterable
     * @param collection
     */
    constructor(collection: ICollection<Type>);
    /**
     * @function To check if next element is available
     * @returns {boolean}
     */
    hasNext(): boolean;
    /**
     * @function To check if prev element is available
     * @returns {boolean}
     */
    hasPrev(): boolean;
    /**
     * @function get next element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no next element available
     * @returns {Type} next element in the iterable
     */
    next(): Type;
    /**
     * @function get prev element in iterable
     * @throws EmptyCollectionException if there are no elements in iterable
     * @throws OutOfBoundsException if there is no prev element available
     * @returns {Type} prev element in the iterable
     */
    prev(): Type;
    /**
     * @function reset the iterable to first position
     */
    reset(): void;
    /**
     * @function move to end of collection
     */
    end(): void;
    /**
     * @function move to beginning of collection
     */
    start(): void;
    private _assertNotEmpty;
}
export default Iterator;
