import { AbstractCollection } from "../Collection";
import IQueue from "./IQueue";
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
declare class Queue<Type> extends AbstractCollection<Type> implements IQueue<Type> {
    /**
     * Max empty values that are allowed after that _queue will be re constructed
     */
    static MAX_EMPTY: number;
    /**
     * Default size of queue
     */
    static DEFAULT_SIZE: number;
    /**
     * To store the elements in array
     */
    private _queue;
    /**
     * Size of initial buffer array specified
     */
    private readonly _size;
    /**
     * To store the right index
     */
    private _right;
    /**
     * To store the left index
     */
    private _left;
    /**
     * @param size  Size of the queue.
     * Queue is dynamic it grows so no need to take care of size
     */
    constructor(size?: number);
    /**
     * @returns returns from front of queue
     * @throws EmptyCollectionException if there are no elements in array
     */
    dequeue(): Type;
    /**
     * @param items add elements in back of queue
     */
    enqueue(...items: Type[]): number;
    /**
     * Reset array
     */
    clear(): void;
    /**
     * @returns Returns size of queue
     */
    size(): number;
    /**
     * @returns {Type[]} returns collection in array format
     */
    entries(): Type[];
    /**
     * @returns {Queue<Type>} Clone the Queue
     */
    clone(): Queue<Type>;
    /**
     * Removes unused elements and resets the values to front
     */
    private copyToBeginning;
}
export default Queue;
