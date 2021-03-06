import ICollection from "./ICollection";
import Iterator from "./Iterator";
/**
 * @class  Collections can implement this as a base class and override methods
 */
declare abstract class AbstractCollection<Type> implements ICollection<Type> {
    /**
     * @returns {Type[]} collection as array
     */
    abstract entries(): Type[];
    /**
     * @returns {number} size of collection
     */
    abstract size(): number;
    /**
     * ES5 iterator so that collection can be used in for loop
     * @yields yields a value from collection
     * @example
     *  ```typescript
     *
     *  const queue = new Queue<number>();
     *  queue.enqueue(1,2,3,4);
     *  for(const element of queue)
     *  {
     *      console.log(element);
     *  }
     *  ```
     */
    [Symbol.iterator](): IterableIterator<Type>;
    /**
     * Get iterator instance for collection
     * @returns {Iterator<Type>} returns iterator
     */
    getIterator(): Iterator<Type>;
    /**
     * Clear a collection
     */
    abstract clear(): void;
    /**
     * Clone a collection
     * @returns {ICollection<Type>}
     */
    abstract clone(): ICollection<Type>;
    /**
     * @function check if collection is empty
     * @return {boolean} true if empty
     */
    isEmpty(): boolean;
}
export default AbstractCollection;
