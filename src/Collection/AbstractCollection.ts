import ICollection from "./ICollection";
import Iterator from "./Iterator";

/**
 * @class  Collections can implement this as a base class and override methods
 */
abstract class AbstractCollection<Type> implements ICollection<Type> {

    /**
     * @returns {Type[]} collection as array
     */
    public abstract entries(): Type[];

    /**
     * @returns {number} size of collection
     */
    public abstract size(): number;

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
    public* [Symbol.iterator]() {
        const it = this.getIterator();
        while (it.hasNext()) {
            yield it.next();
        }
    }

    /**
     * Get iterator instance for collection
     * @returns {Iterator<Type>} returns iterator
     */
    public getIterator(): Iterator<Type> {
        return new Iterator<Type>(this);
    }

    /**
     * Clear a collection
     */
    public abstract clear(): void;

    /**
     * Clone a collection
     * @returns {ICollection<Type>}
     */
    public abstract clone(): ICollection<Type>;

    /**
     * @function check if collection is empty
     * @return {boolean} true if empty
     */
    public isEmpty(): boolean {
        return this.size() === 0;
    }
}

export default AbstractCollection;
